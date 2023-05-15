const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path')

const isDev =  process.env.NODE_ENV === 'development';

const optimization = () => {
    if(!isDev){
        const config = {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
                new HtmlMinimizerPlugin(),
            ],
        }

        return config;
    }
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/ts/index.ts",
    output: {
        filename: "[name][hash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "./assets/[name][hash][ext]",
        clean: true
    },
    devServer: {
        port:3000,
        open:true,
        compress: true,
        hot:false,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name][hash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "./images/[name][hash][ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "./fonts/[name][hash][ext]"
                }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}