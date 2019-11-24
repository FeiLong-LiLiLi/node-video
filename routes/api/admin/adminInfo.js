var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var router = express.Router();

router.get('/',function(req,res,next){

    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    
    var sql = 'SELECT * FROM  admin';
    conn.query(sql, (err,data) => {
        if(err){
           res.json({
               code: 50,
               msg: '获取管理员信息失败',
               data: data
           })
        }else{
            res.json({
                code: 50,
                msg: '获取管理员信息成功',
                total: data.length,
                data: data
            })
        }
    })
    conn.end();
})


module.exports = router;