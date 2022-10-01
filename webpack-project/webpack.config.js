const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, 'src/app.ts'),
    output: {
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        open: true,
        static: {
            publicPath: '/',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, 'public/index.html'),
            favicon: null
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: "public/app.css", to: "." }
            ],
        }),
    ],
    mode: 'development',
};