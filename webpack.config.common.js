const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|apng|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 10000 // 10kb
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        * Build Date: ${new Date().toLocaleString()}
        * Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        * Author: ${childProcess.execSync("git config user.name")}
        * Email: ${childProcess.execSync("git config user.email")}
      `
    }),
    new CleanWebpackPlugin()
  ]
};
