import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack from "webpack";
import { BuildOptions } from "./types/types";
import path from "path";
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const deps = require("../../package.json").dependencies;

export function buildPlugins(options: BuildOptions): webpack.Configuration["plugins"] {
    const isDev = options.mode === "development";
    const isProd = options.mode === "production";

    const plugins: webpack.Configuration["plugins"] = [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify({
                SERVER_NAME: process.env.SERVER_NAME,
            }),
        }),
        new HtmlWebpackPlugin({
            template: options.paths.html,
            filename: "index.html",
            favicon: path.resolve(options.paths.public, "favicon.ico"),
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash:8].css",
                chunkFilename: "assets/css/[name].[contenthash:8].css",
            }),
        );
    }

    return plugins;
}
