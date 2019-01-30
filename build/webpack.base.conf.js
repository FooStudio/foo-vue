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
            assets: path.resolve("src/assets"),
            foo: path.resolve("src/foo"),
            modernizr$: path.resolve(".modernizrrc"),
            src: path.resolve("src"),
            styles: path.resolve("src/styles"),
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
                test: /\.(json)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("data/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader",
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
