var express = require('express');
var bodyParser = require('body-parser');
var app = express();

function logger(req, res, next) {
    console.log('%s', req.method)
    next()
}
app.use(logger)
app.use(bodyParser.json())


// 创建 application/json 解析
var jsonParser = bodyParser.json()

// POST /api/users 获取 JSON 编码的请求体
app.post('/', jsonParser, function (req, res, err) {
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    console.log(req.body)
    res.end()
})

app.listen(3000)