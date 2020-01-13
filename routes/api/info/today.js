var express = require('express');
var uuid = require('node-uuid');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


//初始包括今天在内的往前七天数据
Router.post('/init', (req, res) =>{

    const today = req.body.today;
    const sqlQuery = 'SELECT * FROM todayinfo WHERE today_date = ?';
    const sqlInsert = 'INSERT INTO todayinfo(today_date, login_num, play_num) VALUES (?,?,?)';
    const insertParams = [today, 0, 0];
    
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询七天内日期失败'
            });
        }else if(data. length == 0){
            pool.query(sqlInsert, insertParams, (err, data) => {
                if(err){
                    res.send({
                        success: false,
                        code: 51,
                        msg: '初始化七天内数据失败'
                    });
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '初始化七天内数据成功'
                    });
                }
            });
            pool.end();
        }else{
            res.send({
                success: true,
                code: 2,
                msg: '该天的数据已经存在'
            });
            pool.end();
        }
    }); 

});

//获取当日用户登录量
Router.get('/amount/login', (req, res) => {
    // console.log(req.body);
    const today = req.query.today;
    const sqlQuery = 'SELECT * FROM todayinfo WHERE today_date = ?' ;
    const sqlInsert = 'INSERT INTO todayinfo(today_date, login_num, play_num) VALUES (?,?,?)';
    const insertParams = [today, 0, 0];


    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '获取用户当日登录量失败'
            });
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取用户当日登录量成功',
                amount: data[0].login_num
            });
        }
    });
    pool.end();
});

//增加一次用户登录量
Router.get('/login/add', (req, res) =>{
    
    const today = req.query.today;
    const sqlQuery = 'SELECT * FROM todayinfo WHERE today_date = ?';
    const sqlInsert = 'INSERT INTO todayinfo(today_date, login_num, play_num) VALUES (?,?,?)';
    const insertParams = [today, 1, 0];
    const sqlUpdate = 'UPDATE todayinfo SET login_num = ? WHERE today_date = ?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) =>{
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询当日日期失败'
            });
        }else if(data.length == 0){
            pool.query(sqlInsert, insertParams, (err, data) =>{
                if(err){
                    // console.log(err);
                    res.send({
                        success: false,
                        code: 51,
                        msg: '创建当日日期登录量失败'
                    });
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '创建当日日期登录量成功'
                    });
                }
            });
            pool.end();
        }else{
            const addLogin = data[0].login_num + 1;
            const updateParams = [addLogin, today]
            
            pool.query(sqlUpdate, updateParams, (err, data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 52,
                        msg: '增加一次当日用户登录量失败'
                    });
                }else{
                    res.send({
                        success: true,
                        code: 2,
                        msg: '增加一次当日用户登录量成功'
                    });
                }
            });
            pool.end();
        }
    });
});


//获取当日用户播放量
Router.get('/amount/play',function(req,res){
    const today = req.query.today;
    const sqlQuery = 'SELECT * FROM  todayinfo WHERE today_date = ?' ;
    const sqlInsert = 'INSERT INTO todayinfo(today_date, login_num, play_num) VALUES (?,?,?)';
    const insertParams = [today, 0, 0];


    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) => {
       if(err){
           console.log(err);
           res.send({
               success: false,
               code: 50,
               msg: '获取用户当日播放量失败'
           });
       }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取用户当日播放量成功',
                amount: data[0].play_num
            });
       }
    });
    pool.end();
});

//增加一次用户播放量
Router.get('/play/add', (req, res) =>{
    
    const today = req.query.today;
    const sqlQuery = 'SELECT * FROM todayinfo WHERE today_date = ?';
    const sqlInsert = 'INSERT INTO todayinfo(today_date, login_num, play_num) VALUES (?,?,?)';
    const insertParams = [today, 0, 1];
    const sqlUpdate = 'UPDATE todayinfo SET play_num = ? WHERE today_date = ?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) =>{
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询当日日期失败'
            });
        }else if(data.length == 0){
            pool.query(sqlInsert, insertParams, (err, data) =>{
                if(err){
                    // console.log(err);
                    res.send({
                        success: false,
                        code: 51,
                        msg: '创建当日日期播放失败'
                    });
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '创建当日日期播放成功'
                    });
                }
            });
            pool.end();
        }else{
            const addPlay = data[0].play_num + 1;
            const updateParams = [addPlay, today]
            
            pool.query(sqlUpdate, updateParams, (err, data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 52,
                        msg: '增加一次当日用户播放量失败'
                    });
                }else{
                    res.send({
                        success: true,
                        code: 2,
                        msg: '增加一次当日用户播放量成功'
                    });
                }
            });
            pool.end();
        }
    });
});

//插入当天播放视频的用户
Router.post('/user/play/add',function(req,res){

    const data = req.body;
    const sqlInsert = 'INSERT INTO user_play_info VALUES (?,?,?,?,?,?,?,?)' ;
    params = [data.startDate, data.userId, data.userName, data.videoId, data.videoName, data.videoUrl, data.videoDuration, data.startTime]

    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlInsert, params, (err, data) => {
       if(err){
           res.send({
               success: false,
               code: 50,
               msg: '插入当日播放视频用户失败'
           });
       }else{
           res.send({
               success: true,
               code: 1,
               msg: '插入当日播放视频用户成功',
           });
       }
    });
    pool.end();
});

//获取当天播放视频的用户
Router.get('/user/play/info',function(req,res){

    const today = req.query.today;
    const sqlQuery = 'SELECT * FROM user_play_info WHERE start_date = ?' ;

    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, today, (err, data) => {
       if(err){
           res.send({
                success: false,
                code: 50,
                msg: '查询播放视频用户失败'
           });
       }else{
           res.send({
                success: true,
                code: 1,
                msg: '查询播放视频用户成功',
                playUsers: data

           });
       }
    });
    pool.end();
});


module.exports = Router;
