var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/count',function(req,res){
    
    const name = req.body.name;
    const sqlQuery = 'SELECT * FROM  users WHERE name like ' + '\"%'+ name +'%\" ';
    // const sql = 'SELECT * FROM  users WHERE name like "%赵%" ';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询用户数量失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '查询用户数量成功',
                total: data.length,
            })
        }
    })
    pool.end();
})

Router.get('/all', function(req, res){
    const reqData = req.query;
    const name = reqData.name;
    const page = parseInt(reqData.page);
    const num = parseInt(reqData.num);

    const sqlUsers = 'select * from users where name like ' + '\"%'+ name +'%\" limit ?,?'
    const params = [page*num, num]
    // console.log(params);
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlUsers, params, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取查询用户信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取查询用户信息成功',
                users: data
            })
        }
    })
    pool.end();
    
})

module.exports = Router;