var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();


Router.get('/count',function(req,res){

    const sqlQuery = 'SELECT * FROM  video';
    
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '获取视频数量失败',
        
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取视频数量成功',
                total: data.length,
         
            })
        }
    })
    pool.end()
})

Router.get('/all', function(req, res){
    const reqData = req.query;
    const page = parseInt(req.query.page);
    const num = parseInt(reqData.num);

    const sqlVideos = 'select * from video limit ?,?'
    const params = [page*num, num]
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlVideos, params, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取视频信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取视频信息成功',
                videos: data
            })
        }
    })
    pool.end();
    
})

// Router.get('/',function(req,res){

//     const sqlQuery = 'SELECT * FROM  video';
    
//     var pool = mysql.createConnection(dbConfig);
//     pool.connect();
//     pool.query(sqlQuery, (err, data) => {
//         if(err){
//             console.log(err);
//             res.send({
//                 success: false,
//                 code: 50,
//                 msg: '获取视频失败',
        
//             })
//         }else{
//             res.send({
//                 success: true,
//                 code: 1,
//                 msg: '获取视频数量成功',
//                 total: data.length,
         
//             })
//         }
//     })
//     pool.end()
// })



module.exports = Router;

