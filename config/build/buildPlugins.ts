import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {

    const isDev = options.mode === 'development'
    const platform = options.platfrom

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: options.path.html, favicon: path.resolve(options.path.public, 'ship.ico')}),
        new DefinePlugin({
            __PLATFROM__: JSON.stringify(platform)
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ReactRefreshWebpackPlugin(),
    ]

    if(isDev){
        plugins.push(new webpack.ProgressPlugin())
    }
    else{
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(options.path.public, 'local'), to: path.resolve(options.path.output, 'local') }
            ],
            options: {
                concurrency: 100,
            },
        }),)
    }

    if(options.analyzer){
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
