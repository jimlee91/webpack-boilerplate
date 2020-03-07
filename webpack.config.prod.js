const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.config.common");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        // css 파일 로더
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/path/to/"
            }
          },
          "css-loader"
        ]
      },
      {
        // scss 로더
        test: /\.s(a|c)ss$/,
        use: []
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html",
      inject: true,
      hash: true,
      templateParameters: {
        env: "production"
      }
    }),
    new MiniCssExtractPlugin({})
  ]
});
