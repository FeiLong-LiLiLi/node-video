var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入

    var result = {

    };
    const video_id = req.body.video_id;
    const name = req.body.name;
    const category = req.body.category;
    const tag = req.body.tag;
    const link = req.body.link;
    const cover = req.body.cover;
    // // const creat_time = req.body.creat_time;
    // const modify_time = req.body.modify_time;
    const video_desc = req.body.video_desc;
    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    
    //查询id是否存在， 同理可用于判断是否存在邮箱
    const sqlQuery = 'SELECT * FROM  video WHERE video_id = ?';
    const sqlInsert = 'INSERT INTO video (video_id, name, cover, category, tag, link, video_desc) VALUES (?,?,?,?,?,?,?)';
    const addParams = [video_id, name, cover, category, tag, link, video_desc];

    pool.query(sqlQuery, video_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            console.log('id已经存在');
            result.status = 500;
            // res.json(result)
        }
        else{    
            pool.query(sqlInsert, addParams, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    result.status = 200;
                    console.log('视频'+ name +'添加成功');
                }
            });
            pool.end();   
            // console.log(addParams);
        //   console.log('add');          
        }
    })
    // console.log(result);
    res.send(result);
});

module.exports = Router;
