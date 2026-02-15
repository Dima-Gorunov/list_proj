import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { BuildOptions } from "./types/types";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;

    const isDev = mode === "development";
    const isProd = mode === "production";
    return {
        mode: mode ?? "development",
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "assets/js/[name].[contenthash].js",
            assetModuleFilename: "assets/images/[name].[hash][ext][query]",
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: "source-map",

        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
