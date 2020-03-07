const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const generateHTMLPlugins = () =>
  glob.sync("./src/**/*.html").map(
    dir =>
      new HtmlWebpackPlugin({
        filename: path.basename(dir), // Output
        template: dir // Input
      })
  );

module.exports = {
  entry: {
    main: "./src/public/js/app.js"
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./src/public/css",
        to: "./assets/css",
        flatten: true
      },
      {
        from: "./src/public/images",
        to: "./assets/images",
        flatten: true
      }
    ]),
    ...generateHTMLPlugins()
  ]
};
