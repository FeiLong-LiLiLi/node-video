var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');
var uuid = require('node-uuid');

var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入  
    // console.log(req._startTime);
    const uid = uuid.v1();
    const video_id = uid.replace(/\-/g, '');
    const name = req.body.name;
    const category = req.body.category;
    const tag = req.body.tag;
    const link = req.body.link;
    const cover = req.body.cover;
    const creat_time = req._startTime;
    const modify_time = req._startTime;
    const video_desc = req.body.video_desc;

    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    
    const sqlQuery = 'SELECT * FROM  video WHERE video_id = ?';
    const sqlInsert = 'INSERT INTO video (video_id, name, cover, category, tag, link, video_desc, creat_time, modify_time) VALUES (?,?,?,?,?,?,?,?,?)';
    const addParams = [video_id, name, cover, category, tag, link, video_desc, creat_time, modify_time];

    

    pool.query(sqlQuery, video_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            console.log('id已经存在');
        }
        else{    
            pool.query(sqlInsert, addParams, err =>{
                if(err){console.log(err)}
            });
            pool.end();      
        }
    })

    // console.log(res);
    res.send();
});

module.exports = Router;
