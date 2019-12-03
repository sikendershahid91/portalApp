var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/js/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: "babel-loader",
                exclude: /node_modules/
            },
        ]
    },
    output: {
        path: __dirname + 'src/js',
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
