import WebpackLiveReloadPlugin from "webpack-livereload-plugin";

module.exports = {
  devtool: "eval-source-map",
  entry: "./src/entrypoints/frontend.js",
  output: {
    filename: "webpack.js",
    path: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    (new WebpackLiveReloadPlugin()),
  ],
};
