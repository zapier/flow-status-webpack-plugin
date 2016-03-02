const colors = require('colors');
const shell = require('shelljs');

function FlowStatusWebpackPlugin(options) {
    const interfaces = options && options.interfacesPath ? ' --lib ' + options.interfacesPath : '';

    // Developer may change some interface configuration between each
    // file save. To avoid any configuration not being properly sent
    // over to Flow server, we should stop it and start it again.
    shell.exec('flow stop', {silent: true}, () => {
        shell.exec('flow start' + interfaces, {silent: true}, (code) => {
            this.flow_server_running = code === 0;
        });
    });
}

FlowStatusWebpackPlugin.prototype.apply = function(compiler) {
    var _this = this;

    // When Webpack compilation is done, we should run Flow Status.
    compiler.plugin('done', function() {

        // For now it's a week test, but since this plugin is not handling
        // all kind of errors for now, it will work.
        if (_this.flow_server_running) {

            shell.exec('flow status', {silent: true}, (code, stdout) => {
                const hasErrors = code !== 0;

                if (hasErrors) {
                    console.log('\n----------------'.red);
                    console.log('Flow has errors!');
                    console.log('----------------\n'.red);
                    console.log(stdout.red);
                } else {
                    console.log('\n-----------------------------'.green);
                    console.log('Everything is fine with Flow!');
                    console.log('-----------------------------\n'.green);
                    console.log(stdout.green);
                }
            });
        }
    });
};

module.exports = FlowStatusWebpackPlugin;