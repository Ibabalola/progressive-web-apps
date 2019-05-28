const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = env => {
    const {PLATFORM, VERSION} = env;
    return  merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.PLATFORM': JSON.stringify(PLATFORM),
                'process.env.VERSION': JSON.stringify(VERSION)
            })
        ]
    })
};