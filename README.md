Flow Status Webpack Plugin
==========================

This [webpack](http://webpack.github.io/) plugin will automatically start a [Flow](http://flowtype.org/) server (or restart if one is running) when webpack starts up, and run `flow status` after each webpack build. Still experimental.

If you have any idea on how to get it better, you're welcome to contribute!

Requirements
------------

You need to have Flow installed. To do that, follow [these steps](http://flowtype.org/docs/getting-started.html#_).

Installation
------------
`npm install flow-status-webpack-plugin --save-dev`

Usage
-----

```js
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin()
    ]
}
```

Configuration
-------------

If you want to pass additional command-line arguments to `flow start`, you can pass a `flowArgs` option to the plugin:

```js
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin({
            flowArgs: '--lib path/to/interfaces/directory'
        })
    ]
}
```

If you don't want the plugin to automatically restart any running Flow server, pass `restartFlow: false`:

```js
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin({
            restartFlow: false
        })
    ]
}
```

If provided a binary path, will run Flow from this path instead of running it from any global installation.

```js
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin({
            binaryPath: '/path/to/your/flow/installation'
        })
    ]
}
```

License
-------
This plugin is released under the [MIT License](https://opensource.org/licenses/MIT).
