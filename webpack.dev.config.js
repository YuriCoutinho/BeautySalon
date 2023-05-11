const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: { bundle: "./index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][fullhash].js",
    clean: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "BeautySalon",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "main.css" }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
};
