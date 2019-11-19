var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();



Router.post('/',function(req,res){
    
    const name = req.body.name;
    var pool = mysql.createConnection(dbConfig);
    // const sql = 'SELECT * FROM  users WHERE name like "%赵%" ';
    const sqlLike = 'SELECT * FROM  admin WHERE name like ' + '\"%'+ name +'%\" ';
    pool.query(sqlLike, function(err,data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            // console.log(sqlLike);
            result = data;
            res.json(result);
        }else{
            console.log('未找到')
            result = data;
            res.json(result);
        }
    })
    pool.end();
})


module.exports = Router;