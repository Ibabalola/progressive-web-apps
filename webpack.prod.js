const merge = require('webpack-merge');
const commons = require('./webpack.common');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const productionConfiguration = function (env) {
    return {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        mangle: {
                            keep_fnames: true,
                        },
                    },
                })
            ],
        },
        plugins: [
            new OptimizeCssAssetsPlugin(),
        ]
    };
};

module.exports = merge(commons, productionConfiguration);