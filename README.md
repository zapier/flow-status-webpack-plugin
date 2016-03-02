Flow Status Webpack Plugin
==========================

This [webpack](http://webpack.github.io/) plugin will start a [Flow](http://flowtype.org/) server and run `flow status` on each webpack build. Still experimental.

If you have any idea on how to get it better, you're welcome to contribute!

Requirements
------------

You need to have Flow installed. To do that, follow [these steps](http://flowtype.org/docs/getting-started.html#_).

Installation
------------
`npm install flow-status-webpack-plugin --save-dev`

Usage
-----

```
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin()
    ]
}
```

It will generate an output like this:

![Flow has no errors](http://i.imgur.com/GX2xg8J.png?1)

or, in case of some error:

![Flow has errors](http://i.imgur.com/4cnu50c.png?1)

Configuration
-------------

In case you have [Flow Interfaces](http://flowtype.org/docs/third-party.html#_) and you're not using a `.flowconfig` file, you need to specify a path to your interfaces directory, otherwise flow will not be able to identify (and use) those interfaces.

```
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new FlowStatusWebpackPlugin({
            interfacesPath: 'path/to/interfaces/directory'
        })
    ]
}
```

License
-------
This plugin is released under the [MIT License](https://opensource.org/licenses/MIT).