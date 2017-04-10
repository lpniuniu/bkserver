var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var query = require('connect-query')

var db = mongoose.connect('mongodb://localhost/bkdb')
var Schema = mongoose.Schema
// 注册
var Setting= new Schema({
    _id:String,
    key:String,
    value:String
})
mongoose.model('Setting', Setting)

var app = express();


var jsonParser = bodyParser.json()
app.post('/', jsonParser, function (req, res, next) {
    if (req.body.length == 0) return res.sendStatus(400)
    console.log(req.body)
    var setting = req.body['setting']
    if (setting != undefined) {
        var userId = setting['userId']
        var key = setting['key']
        var value = setting['value']

        if (userId != undefined && userId == 'hzfanfei' && key != undefined  && value != undefined) {
            console.log('数据正确')
            var Setting = mongoose.model('Setting')
            var setting = new Setting()
            setting._id = userId
            setting.key = key
            setting.value = value
            setting.save(function (err) {
                if (!err) {
                    console.log('save success !')
                }
            })
            return res.sendStatus(200)
        } else {
            console.log('数据错误')
            return res.sendStatus(500)
        }
    }
    res.end()
})

app.get('/', query(), function (req, res, next) {
    console.log(req.query)
    var userId = req.query['userId']
    if (userId != undefined) {
        var Setting = mongoose.model('Setting')
        Setting.find({'_id': userId}, function (err, settings) {
            if (err) {
                res.sendStatus(500)
                res.end('find')
                return
            }
            if (settings.length > 0) {
                res.jsonp(settings[0])
            } else {
                res.end()
            }
        })
    } else {
        res.sendStatus(500)
    }
})

app.listen(3000)