var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();


Router.get('/',function(req,res){
    
    // var result = '';
    var pool = mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM  users';
    pool.query(sql, function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log('查询用户信息成功');
            result = data;
            res.json(result);
        }
    })
    pool.end();
})


module.exports = Router;