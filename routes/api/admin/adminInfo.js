var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var router = express.Router();

router.get('/',function(req,res,next){

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    
    var sql = 'SELECT * FROM  admin';
    pool.query(sql, function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log('管理员信息成功');
            result = data;
            res.json(result);
        }
    })
    pool.end();
})


module.exports = router;