var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/',function(req,res){
    
    const name = req.body.name;
    var pool = mysql.createConnection(dbConfig);
    // const sql = 'SELECT * FROM  users WHERE name like "%赵%" ';

    const sqlQuery = 'SELECT * FROM  video WHERE name like ' + '\"%'+ name +'%\" ';
    pool.query(sqlQuery, function(err,data){
        if(err){
            res.json({
                code: 50,
                msg: '视频查询失败',
                data: data
            });
        }else{
            res.json({
                code: 1,
                msg: '视频查询成功',
                total: data.length,
                data: data
            });
        }
    })
    pool.end();
})


module.exports = Router;