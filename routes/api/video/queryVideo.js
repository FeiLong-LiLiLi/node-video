var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/count',function(req,res){
    
    const name = req.body.name;
    var pool = mysql.createConnection(dbConfig);

    const sqlQuery = 'SELECT * FROM  video WHERE name like ' + '\"%'+ name +'%\" ';
    pool.query(sqlQuery, function(err,data){
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取被查询视频数量失败',
                // data: data
            });
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取被查询视频数量成功',
                total: data.length,
                // videos: data
            });
        }
    })
    pool.end();
})

Router.get('/all',function(req,res){
    
    const reqData = req.query;
    const name = reqData.name;
    const page = parseInt(reqData.page);
    const num = parseInt(reqData.num);
    // console.log(reqData);
    const sqlVideo = 'SELECT * FROM  video WHERE name like ' + '\"%'+ name +'%\" limit ?,?';
    params = [page*num, num]
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlVideo, params, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取被查询视频信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取被查询视频信息成功',
                videos: data
            })
        }
    })
    pool.end();
})

module.exports = Router;