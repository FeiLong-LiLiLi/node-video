var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();


Router.get('/',function(req,res){
    
    const sql = 'SELECT * FROM  users';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sql, (err,data) => {
        if(err){
            res.json({
                code: 50,
                msg: '获取用户信息失败',
                data: {}
            })
        }else{
            res.json({
                code: 1,
                msg: '获取用户信息成功',
                total: data.length,
                data: data
            })
        }
    })
    pool.end();
})


module.exports = Router;