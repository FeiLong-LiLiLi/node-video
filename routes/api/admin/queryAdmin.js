var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/',function(req,res){
    
    const name = req.body.name;
    const sqlQuery = 'SELECT * FROM  admin WHERE name like ' + '\"%'+ name +'%\" ';

    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(sqlQuery, (err,data) => {
        if(err){
            res.json({
                code: 50,
                msg: '查询管理员失败',
                // data: data
            })
        }else{
            res.json({
                code: 1,
                msg: '查询管理员成功',
                total: data.length,
                data: data
            })
        }
    })
    conn.end();
})


module.exports = Router;