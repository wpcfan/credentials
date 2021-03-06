const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    cache: true,

    context: __dirname,

    entry: {
        'base.style-ltr': './credentials/static/sass/main-ltr.scss',
        'base.style-rtl': './credentials/static/sass/main-rtl.scss',
        'openedx.certificate.style-ltr': './credentials/apps/credentials_theme_openedx/static/sass/certificate-ltr.scss',
        'openedx.certificate.style-rtl': './credentials/apps/credentials_theme_openedx/static/sass/certificate-rtl.scss',
        'sharing': './credentials/static/js/sharing.js',
        'analytics': './credentials/static/js/analytics.js'
    },

    output: {
        path: path.resolve('./credentials/static/bundles/'),
        filename: '[name]-[hash].js'
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin('[name]-[hash].css')
    ],

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.woff2?$/,
                // Inline small woff files and output them below font
                loader: 'url-loader',
                query: {
                    name: 'font/[name]-[hash].[ext]',
                    limit: 5000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: 'file-loader',
                query: {
                    name: 'font/[name]-[hash].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['latest']}
                }],
            }
        ]
    },
    resolve: {
        modules: ['./node_modules'],
        extensions: ['.css', '.js', '.scss']
    }
};
