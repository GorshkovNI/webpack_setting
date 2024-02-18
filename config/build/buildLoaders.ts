import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";
export function buildLoaders(options: BuildOptions): ModuleOptions['rules']{

    const isDev = options.mode === 'development'

    const cssLoader = {
            loader: "css-loader",
            options: {
                url: true,
                modules: {
                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                }
            },
    }

    const assetLoader = {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }

    const scssLoader = {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                cssLoader,
                "sass-loader",
            ],
    }

    const tsLoader = {
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader',
                options:{
                    getCustomTransformers: () => ({
                        before: [ReactRefreshTypeScript()],
                    }),
                    transpileOnly: true
                }

            },
            exclude: /node_modules/,
    }

    const babelLoader= buildBabelLoader(options)

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {loader: '@svgr/webpack', options: { icon: true }}
        ],
    }

    return [
        assetLoader,
        scssLoader,
        //tsLoader,
        babelLoader,
        svgLoader
    ]
}
