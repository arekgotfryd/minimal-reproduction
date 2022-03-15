const path = require("path");
const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.join(__dirname, "src", "test.ts"),
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: "@ngtools/webpack",
      },
      {
        test: /\.(html|css)$/,
        loader: "raw-loader",
        exclude: /\.async\.(html|css)$/,
      },
    ],
  },
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: path.join(__dirname, "tsconfig.spec.json"),
    }),
    new webpack.ProgressPlugin({
      // profile: true,
      percentBy: "entries",
    }),
  ],
};
