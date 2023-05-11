const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: {
    bundle: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][fullhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
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
  optimization: {
    minimizer: [`...`, new CssMinimizerWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "BeautySalon",
      template: "./index.html",
      filename: "index.html",
      hash: true,
    }),
    new MiniCssExtractPlugin({ filename: "main.css" }),
  ],
};
