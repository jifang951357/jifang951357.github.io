let express = require("express");
let Mock = require("mockjs");
let app = express();
let bodyParser = require("body-parser");

// let proxy = require('http-proxy-middleware')
// const context = [`*`];
// const options = {
//     target: 'http://localhost:3001',
//     changeOrigin: true
//     }
// const apiProxy = proxy(options)
// app.use(context, apiProxy)

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json()); //body-parser 解析json格式数据
app.use(
  bodyParser.urlencoded({
    //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
  })
);

app.use("/studentList", function(req, res) {
  const data = Mock.mock({
    statusCode: 200,
    message: "获取列表成功",
    data: [
      {
        key: "1",
        name: "胡彦斌-学生1",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖-学生2",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ]
  });

  return res.json(data);
});

app.use("/teacherList", function(req, res) {
  const data = Mock.mock({
    statusCode: 200,
    message: "获取列表成功",
    data: [
      {
        key: "1",
        name: "胡彦斌-老师1",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖-老师2",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ]
  });

  return res.json(data);
});

app.listen(3001);
