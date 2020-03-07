const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
module.exports = {
  mode,
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
        // css 파일 로더
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "/public/path/to/"
                }
              }
            : "style-loader",
          "css-loader"
        ]
      },
      {
        // scss 로더
        test: /\.s(a|c)ss$/,
        use: []
      },
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
    new webpack.DefinePlugin({
      // Definitions...
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html",
      inject: true,
      hash: true,
      templateParameters: {
        env: process.env.NODE_ENV === "development" || "(개발용)"
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({})
  ]
};
