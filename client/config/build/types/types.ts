export interface BuildPath {
  entry: string;
  html: string;
  output: string;
  images: string;
  public: string;
  src: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  appName: string;
  port: number;
  paths: BuildPath;
  mode: BuildMode;
}
