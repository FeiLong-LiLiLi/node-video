var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();

Router.post('/',function(req,res){


     //数据缓存
    const video_id = req.body.video_id;
    const name = req.body.name;
    const category = req.body.category;
    const tag = req.body.tag;
    const link = req.body.link;
    const cover = req.body.cover;
    // // const creat_time = req.body.creat_time;
    // const modify_time = req.body.modify_time;
    const video_desc = req.body.video_desc;
    // //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    //查询是否存在
    const sqlQuery = 'SELECT * FROM video WHERE video_id=?';
    const sqlUpdade = 'UPDATE video SET name=?, category=?, tag=?, link=?, cover=?, video_desc=? WHERE video_id=?';
    const updateParams = [name, category, tag, link, cover, video_desc, video_id];
    pool.query(sqlQuery, video_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            //更新数据
            pool.query(sqlUpdade, updateParams, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    // pool.query(sqlQuery, video_id, function(err, data){
                    //     if(err) throw
                    //     reject = data;
                    // })
                    // reject = data;
                    // console.log('id为'+ video_id + '视频已更新');
                    res.json();
                }

            });
            pool.end();      
        }
    });   
    // res.json();
});


module.exports = Router;