var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/count',function(req,res){
    
    const name = req.body.name;
    const sqlQuery = 'SELECT * FROM  admin WHERE name like ' + '\"%'+ name +'%\" ';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取被查询管理员数量失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取被查询管理员数量成功',
                total: data.length,
                // admins: data
            })
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
    const sqlAdmin = 'SELECT * FROM  admin WHERE name like ' + '\"%'+ name +'%\" limit ?,?';
    params = [page*num, num]
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlAdmin, params, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取被查询管理员信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取被查询管理员信息成功',
                admins: data
            })
        }
    })
    pool.end();
})



module.exports = Router;