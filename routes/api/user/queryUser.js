var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/',function(req,res){
    
    const name = req.body.name;
    const sqlQuery = 'SELECT * FROM  users WHERE name like ' + '\"%'+ name +'%\" ';
    // const sql = 'SELECT * FROM  users WHERE name like "%赵%" ';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.json({
                code: 50,
                msg: '查询用户信息失败',
                // data: data 
            })
        }else{
            res.json({
                code: 1,
                msg: '查询用户信息成功',
                total: data.length,
                data: data
            })
        }
    })
    pool.end();
})


module.exports = Router;