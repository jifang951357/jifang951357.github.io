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
    filename: "/js/[name].js"
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
    ],
    rules: [
      //1.0的是loaders
      //处理js中的loader
      {
        test: /\.tsx$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "/src"), //指定打包的文件
        exclude: path.resolve(__dirname, "/node_modules") //排除打包的文件，加速打包时间
      },
      //处理css中的loader
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?importLoaders=1!postcss-loader" //@import进来的样式在问号后加
      },
      //处理sass中的loader
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!postcss-loader!sass-loader"
      },
      //处理html模板中的loader
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      //处理ejs模板中的loader,以.tpl后缀结尾的
      {
        test: /\.tpl$/,
        loader: "ejs-loader"
      },
      //处理图片中的loader,file-loader,url-loader,image-webpack-loader相互配合(图片格式转换base64 图片压缩)
      {
        test: /\.(png|jpg|gif|svg)$/i, //模板中的图片放相对路径: src="${require('../imgs/aaa.jpg')}"
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("/css/app.css"),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false, //去掉注释
      compress: {
        warnings: false //忽略警告,要不然会有一大堆的黄色字体出现……
      }
    }), //根据模板自动生成 'Index.cshtml' 文件，并且将带有hash指纹的js打入到html中
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "build/index.html"), //生成的文件，从 output.path 开始 output.path + "/react.html"
      template: "index.html", //读取的模板文件,这个路径是相对于当前这个配置文件的
      inject: false, // 自动注入
      hash: true,
      minify: {
        removeComments: true, //去注释
        collapseWhitespace: true //压缩空格
        // removeAttributeQuotes: true //去除属性引用
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ]
  // devServer: {
  //   // proxy: {
  //   //   '/*': {
  //   //     target: 'http://localhost:8000'
  //   //   },
  //   // }
  //   port: "8000"
  // }
};
