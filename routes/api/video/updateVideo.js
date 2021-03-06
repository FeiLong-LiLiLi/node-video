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
    // const link = req.body.link;
    const cover = req.body.cover;
    const modify_time = req._startTime;
    const video_desc = req.body.video_desc;
    // //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    //查询是否存在
    const sqlQuery = 'SELECT * FROM video WHERE video_id=?';
    const sqlUpdade = 'UPDATE video SET name=?, category=?, tag=?, cover=?, video_desc=?, modify_time=? WHERE video_id=?';
    const updateParams = [name, category, tag, cover, video_desc, modify_time, video_id];

    pool.query(sqlUpdade, updateParams, (err) =>{
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '视频更新失败',
        
            })
        }else{
            pool.query(sqlQuery, video_id, (err,data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 50,
                        msg: '查询更新视频失败, 请刷新',
                        // data: data
                    })
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '视频更新成功',
                        video: data[0]
                    })
                }   
            })
            pool.end()
        }
    })
});


module.exports = Router;