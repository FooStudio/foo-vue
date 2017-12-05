"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const stylusLoader = require("stylus-loader");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            "@": resolve("src"),
            src: path.resolve("src"),
            assets: path.resolve("src/assets"),
            app: path.resolve("src/app"),
            styles: path.resolve("src/styles"),
            foo: path.resolve("src/foo"),
            modernizr$: path.resolve(".modernizrrc")
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint
                ? [
                    {
                        test: /\.(js|vue)$/,
                        loader: "eslint-loader",
                        enforce: "pre",
                        include: [resolve("src"), resolve("test")],
                        options: {
                            formatter: require("eslint-friendly-formatter"),
                            emitWarning: !config.dev.showEslintErrorsInOverlay
                        }
                    }
                ]
                : []),
            {
                test: /\.modernizrrc(\.json)?$/,
                loader: "modernizr-loader!json-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve("src"), resolve("test")]
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
                options: {
                    // optional [svgo](https://github.com/svg/svgo) options
                    svgo: {
                        plugins: [
                            {removeDoctype: true},
                            {removeComments: true},
                            {removeMetadata: true},
                            {removeTitle: true},
                            {removeDesc: true},
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
        ]
    },
    plugins: [
        new stylusLoader.OptionsPlugin({
            default: {
                use: [
                    require("nib")(),
                    require("rupture")(),
                    require("poststylus")([
                        require("rucksack-css")({
                            autoprefixer: false,
                            fallbacks: false
                        }),
                        require("lost")()
                    ])
                ],
                import: [
                    "~nib/lib/nib/index.styl",
                    "~rupture/rupture/index.styl"
                ]
            }
        })
    ]
};
