var colors = require('colors');
var shell = require('shelljs');


function isFunction(x) {
  return Object.prototype.toString.call(x) == '[object Function]';
}


function FlowStatusWebpackPlugin(options) {
  this.options = options || {};
}

FlowStatusWebpackPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var flowArgs = options.flowArgs || '';
  var flow = options.binaryPath || 'flow';
  var firstRun = true;
  var waitingForFlow = false;

  function startFlow(cb) {
    if (options.restartFlow === false) {
      cb();
    } else {
      shell.exec(flow + ' stop', {silent: true}, function() {
        shell.exec(flow + ' start ' + flowArgs, {silent: true}, cb);
      });
    }
  }

  function startFlowIfFirstRun(compiler, cb) {
    if (firstRun) {
      firstRun = false;
      startFlow(cb);
    }
    else {
      cb();
    }
  }

  function flowStatus (successCb, errorCb) {
    if (!waitingForFlow) {
      waitingForFlow = true;

      // this will start a flow server if it was not running
      shell.exec(flow + ' status --color always', {silent: true}, function(code, stdout, stderr) {
        var hasErrors = code !== 0;
        var cb = hasErrors ? errorCb : successCb
        waitingForFlow = false;

        if (isFunction(cb)) {
          cb(stdout, stderr)
        }
      });
    }
  }

  var flowError = null

  function checkItWreckIt (compiler, cb) {
    startFlowIfFirstRun(compiler, function () {
      flowStatus(function success () {
        cb()
      }, function error (stdout) {
        flowError = new Error(stdout)
        cb()
      })
    })
  }

  compiler.plugin('run', checkItWreckIt);
  compiler.plugin('watch-run', checkItWreckIt);

  // If there are flow errors, fail the build before compilation starts.
  compiler.plugin('compilation', function (compilation) {
    if (flowError) {
      compilation.errors.push(flowError);
      flowError = null;
    }
  });
};

module.exports = FlowStatusWebpackPlugin;
