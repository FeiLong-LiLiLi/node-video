var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


Router.get('/',function(req,res){

    const video_id = req.query.video_id;
    const sqlQuery = 'SELECT * FROM  video WHERE video_id =?';
    const sqlDel = 'DELETE FROM video WHERE video_id =?';

    // var pool = mysql.createPool(dbConfig);
    // pool.getConnection((err, conn) =>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         conn.query(sqlDel, video_id, (err, data) =>{
    //             if(err){
    //                 res.json({
    //                     code: 50,
    //                     msg: '删除失败',
    //                     data: data
    //                 })
    //             }else{
    //                 res.json({
    //                     code: 1,
    //                     msg: '删除成功',
    //                     data: data
    //                 })
    //             }
    //         })
    //         conn.release()
    //     }
    // })

    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    pool.query(sqlDel, video_id, (err, data) => {
        if(err){
            res.json({
                code: 50,
                msg: '视频删除失败',
                data: data.affectedRows
            })
        }else{
            res.json({
                code: 1,
                msg: '视频删除成功',
                data: data.affectedRows
            })
        }
    })
    pool.end();

});


module.exports = Router;