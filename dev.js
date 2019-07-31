var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "/js/[name].js",
    chunkFilename: "[id].chunk.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".webpack.js", ".web.js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(["css", "sass"])
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|eot|woff|ttf)$/,
        loader: "url",
        query: {
          limit: 10000,
          name: "[name].[ext]"
        }
      }
    ]
  },
  plugins: [new ExtractTextPlugin("/css/app.css")],
  devServer: {
    // proxy: {
    //   '/*': {
    //     target: 'http://localhost:8000'
    //   },
    // }
    port: "3000"
  }
};
