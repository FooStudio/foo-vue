var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': path.resolve('src'),
            'assets': path.resolve('src/assets'),
            'app': path.resolve('src/app'),
            'styles': path.resolve('src/styles'),
            'foo': path.resolve('src/foo'),
            modernizr$: path.resolve('.modernizrrc')
        }
    },
    module: {
        rules: [
            {
                test: /\.modernizrrc(\.json)?$/,
                loader: "modernizr-loader!json-loader"
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.styl$/,
            stylus: {
                // You can have multiple stylus configs with other names and use them
                // with `stylus-loader?config=otherConfig`.
                default: {
                    use: [
                        require('nib')(),
                        require("rupture")(),
                        require("poststylus")([
                            require("rucksack-css")({
                                autoprefixer: false,
                                fallbacks: false
                            }),
                            require("lost")()
                        ])
                    ],
                    import: ['~nib/lib/nib/index.styl', '~rupture/rupture/index.styl']
                },
            },
        }),
    ]
}
