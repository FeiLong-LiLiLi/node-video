var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');
var uuid = require('node-uuid');

var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入  
    // console.log(req._startTime);
    // const add_video_res = {};

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

    const sqlQuery = 'SELECT * FROM  video WHERE video_id = ?';
    const sqlInsert = 'INSERT INTO video (video_id, name, cover, category, tag, link, video_desc, creat_time, modify_time) VALUES (?,?,?,?,?,?,?,?,?)';
    const addParams = [video_id, name, cover, category, tag, link, video_desc, creat_time, modify_time];

    var pool = mysql.createPool(dbConfig);
    pool.getConnection((err,conn) => {
        if(err){
            onsole.log('连接失败');
        }else{
            conn.query(sqlInsert, addParams, (err,data) =>{
                if(err){
                    add_video_res = {}
                    add_video_res.code = 500;
                    add_video_res.msg = '添加失败';
                    add_video_res.data = {};
                    res.json(add_video_res);
                }else{
                    conn.query(sqlQuery, video_id, (err, data) =>{
                        if(err){
                            res.json({
                                code: 50,
                                msg: '查询失败',
                                data: {}
                            });
                        }else{
                            console.log(data);
                            res.json({
                                code: 1,
                                msg: '添加成功',
                                data: data[0]
                            })
                        }
                    })
                    conn.release();
                }
            })
        }
    })
    
});



module.exports = Router;
