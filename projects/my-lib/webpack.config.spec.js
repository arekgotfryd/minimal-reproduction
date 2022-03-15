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
  // remove externals from build as ssa provides them
  externals: [
    function (context, request, callback) {
      if (/^ssa.*$/.test(request)) {
        // console.log(context, request);
        return callback(null, request.replace(/^ssa/, "src/app"));
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: "@ngtools/webpack",
        options: {
          transpileOnly: true,
          happyPackMode: true,
        },
      },
      {
        test: /\.(html|css)$/,
        loader: "raw-loader",
        exclude: /\.async\.(html|css)$/,
      },
      {
        test: /\.js$/,
        loader: require.resolve("@open-wc/webpack-import-meta-loader"),
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
