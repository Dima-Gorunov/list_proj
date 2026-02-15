import { BuildMode, BuildPath } from "./config/build/types/types";
import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
interface EnvVariables {
  mode: BuildMode;
  port: number;
}
// 1:19:40
module.exports = (env: EnvVariables) => {
  const paths: BuildPath = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    images: path.resolve(__dirname, "src", "images"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };
  const config: webpack.Configuration = buildWebpack({
    appName: "host",
    port: env.port ?? 3000,
    mode: env.mode,
    paths: paths,
  });

  return config;
};
