var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var router = express.Router();


router.get('/',function(req,res){

    const sqlQuery = 'SELECT * FROM  video';
    
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err, data) => {
        if(err){
            console.log(err);
            res.json({
                code: 50,
                msg: '获取数据失败',
                // data: {}
            })
        }else{
            res.json({
                code: 1,
                msg: '获取数据成功',
                total: data.length,
                video: data
            })
        }
    })
    pool.end()


    // var pool = mysql.createPool(dbConfig);
    // pool.getConnection((err, conn) =>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         conn.query(sqlQuery, (err, data) =>{
    //             if(err){
    //                 res.json({
    //                     code: 50,
    //                     msg: '获取数据失败',
    //                     data: []
    //                 })
    //             }else{
    //                 res.json({
    //                     code: 1,
    //                     msg: '获取数据',
    //                     data: data
    //                 })
    //             }
    //         })
    //         conn.release()
    //     }
    // })
    
})

module.exports = router;

