var path = require("path");

module.exports = {
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    publicPath: "assets",
    filename: "bundle.js",
    libraryTarget: "this"
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  }
};