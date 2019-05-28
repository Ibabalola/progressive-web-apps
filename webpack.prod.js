const merge = require('webpack-merge');

// Config
const commons = require('./webpack.base');

// Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const productionConfiguration = env => {
    return merge([
        {
            optimization: {
                // runtimeChunk: 'single',
                // splitChunks: {
                //   cacheGroups: {
                //     vendor: {
                //       test: /[\\/]node_modules[\\/]/,
                //       name: 'vendors',
                //       chunks: 'all'
                //     }
                //   }
                // },
                minimizer: [new UglifyJsPlugin()],
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'styles.css',
                }),
                new OptimizeCssAssetsPlugin(),
                new Visualizer({ filename: './statistics.html' })
            ]
        }
    ]);
};

module.exports = env => {
    return merge(commons(env), productionConfiguration(env));
};