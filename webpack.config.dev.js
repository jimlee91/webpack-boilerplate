const path = require("path");
const webpack = require("webpack");
const apiMocker = require("connect-api-mocker");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.config.common");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "127.0.0.1",
    overlay: true,
    port: 8080,
    stats: "errors-only",
    hot: true,
    proxy: {
      "/api": "http://localhost:8081" // 프록시
    },
    before: (app, server, complier) => {
      console.log(server);
      console.log(complier);
      app.use(apiMocker("/api", "mocks/api"));
    }
  },
  module: {
    rules: [
      {
        // css 파일 로더
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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
    new MiniCssExtractPlugin({})
  ]
});
