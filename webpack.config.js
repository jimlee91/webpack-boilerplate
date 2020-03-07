const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");

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
        test: /\.html$/,
        use: []
      },
      {
        // css 파일 로더
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // scss 로더
        test: /\.s(a|c)ss$/,
        use: []
      },
      {
        test: /\.js$/,
        use: []
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
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name") +
          " / " +
          childProcess.execSync("git config user.name")}
      `
    })
  ]
};
