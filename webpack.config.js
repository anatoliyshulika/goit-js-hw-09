// Источник https://www.taniarascia.com/how-to-use-webpack/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack");
const CopyPlugin = require("copy-webpack-plugin");

let htmlPageNames = ["index", "01-color-switcher", "02-timer", "03-promises"];
let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    inject: "body",
  });
});

module.exports = {
  entry: {
    [htmlPageNames[0]]: path.resolve(__dirname, "./src/index.js"),
    [htmlPageNames[1]]: path.resolve(
      __dirname,
      "./src/js/01-color-switcher.js"
    ),
    [htmlPageNames[2]]: path.resolve(__dirname, "./src/js/02-timer.js"),
    [htmlPageNames[3]]: path.resolve(__dirname, "./src/js/03-promises.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "[name][ext]",
    clean: true,
  },

  stats: {
    children: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devtool: "source-map",

  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    new ImageminPlugin({
      bail: false,
      cache: false,
      name: "[name].[ext]",
      imageminOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
        ],
      },
    }),

    // new CopyPlugin({
    //   patterns: [{ from: "./src/js/jsCopyToDist" }],
    // }),
  ].concat(multipleHtmlPlugins),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        exclude: /fonts/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        exclude: /images/,
        type: "asset/resource",
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
