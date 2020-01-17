var express = require('express')
var queryString = require('querystring')
var http = require('http')
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Routor = express.Router();

Routor.post('/info',(req, res) =>{

    // console.log(req.ip);
    const data = JSON.parse(req.body.flowData);
    // const data = req.body;
    const time = req._startTime;

     // const sqlInsert = 'INSERT INTO admin (admin_id, name, psw, phone, email, creat_time) VALUES(?,?,?,?,?,?)';
    const sqlInsert = 'INSERT INTO monitordata (user_id, name, vurl, vbitrate, vbuffer, vdframes, vratio, abitrate, abuffer, adframes, aratio, time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    params = [data.userId, data.userName, data.vUrl, data.vBitrate, data.vBuffer, data.vDframes, data.vRatio, data.aBitrate, data.aBuffer, data.aDframes, data.aRatio, time];
    // console.log(params);

    // const sqlInsert = 'INSERT INTO MONITORDATA(admin_id, name) VALUES(?,?)'
    // params = [data.user_id, data.name]
    // console.log(params);

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlInsert, params, (err, data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '添加视频播放信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '添加视频播放信息成功',
            })
        }
    })
    pool.end();
})

Routor.get('/get', (req, res) => {

    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    
    var sql = 'SELECT * FROM  MONITORDATA';
    conn.query(sql, (err,data) => {
        if(err){
           res.send({
               success: false,
               code: 50,
               msg: '获取当前视频信息失败',
            //    data: data
           })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取当前视频信息成功',
                info: data
                // info: data[data.length -1],
            })
        }
    })
    conn.end();
});


//插入当前播放的视频数据
Routor.post('/play/info',(req, res) =>{

    const data = req.body
    const sqlInsert = 'INSERT INTO play_video_data VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    // params = [data.userId, data.userName, data.vUrl, data.vBitrate, data.vBuffer, data.vDframes, data.vRatio, data.aBitrate, data.aBuffer, data.aDframes, data.aRatio, time];
    params = [data.userId, data.userName, data.videoId, data.videoName, data.videoUrl, data.videoBitrateDownloading,
            data.videoBufferLength,data.videoDroppedFrames, data.videoRatio, data.audioBitrateDownloading, 
            data.audioBufferLength, data.audioDroppedFrames, data.audioRatio,data. videoTime, data.nowTime];
 
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlInsert, params, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '插入视频播放信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '插入视频播放信息成功',
            })
        }
    })
    pool.end();
});

//获取用户播放视频的数据
Routor.get('/play/info/get', (req, res) =>{
    const data = req.query;
    const sqlQuery = 'SELECT * FROM play_video_data WHERE  user_id =? AND video_id =? AND now_time >=? ';
    const params = [data.userId, data.videoId, data.startTime]
    const pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, params, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询用户视频播放信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '查询用户视频播放信息成功',
                videoInfos: data
            })
        }
    })
    pool.end();
});


//获取一分钟内播放视频的用户
Routor.get('/play/now/get', (req, res) =>{
    const oneMinsAgeTime = req.query.oneMinsAgeTime;
    const today = req.query.today;
    sqlQueryPlay = 'SELECT * FROM play_video_data WHERE now_time >= ?';
    sqlQueryUser = 'SELECT * FROM user_play_info WHERE start_date = ?';
    
    const pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQueryPlay, oneMinsAgeTime, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询用户视频播放信息失败',
            })
        }else{
            //获取当前播放的视频信息
            const nowPlayInfo = data;
            pool.query(sqlQueryUser, today, (req, data) =>{
                if(err){
                    console.log(err)
                    res.send({
                        success: false,
                        code: 51,
                        msg: '查询今天播放视频的用户失败',
                    }) 
                }else{
                    //获取今天播放视频的用户
                    todayPlayUser = data;
                    const getPlayUser = [];
                    //根据user_id和video_id查询今天播放用户
                    for(let i = 0; i< todayPlayUser.length; i++){
                        for(let j = 0; j < nowPlayInfo.length; j++){
                            switch(todayPlayUser[i].user_id){
                                case nowPlayInfo[j].user_id:
                                    switch(todayPlayUser[i].video_id){
                                        case nowPlayInfo[j].video_id:
                                            // console.log(todayPlayUser[i]);
                                            //因为在对最新获取到的视频不是一条，信息获取到的数据会重复，所以需要去重复
                                            getPlayUser.push(todayPlayUser[i]);    
                                            break;
                                    }
                                    break;
                            }
                        }
                    }
                    //清除重复的数据
                    const nowPlayUser = [...new Set(getPlayUser)]; 
                    res.send({
                        success: true,
                        code: 1,
                        msg: '查询现在播放视频的用户成功',
                        // nowPlayInfo: nowPlayInfo,
                        // todayPlayUser: todayPlayUser,
                        playUsers: nowPlayUser
                    });
                    
                }
            });
            pool.end();

        }
    })
})

//获取某日播放视频的用户
Routor.get('/play/oneDay/get', (req, res) =>{
    const oneDay = req.query.oneDay;
    const sqlQuery = 'SELECT * FROM user_play_info WHERE start_date = ?'
    const pool = mysql.createConnection(dbConfig);

    pool.connect();
    pool.query(sqlQuery, oneDay, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询播放视频的用户失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '查询播放视频的用户成功',
                playUsers: data
            })
        }
    })
    pool.end();
});

//获取某段时间播放视频的用户
Routor.get('/play/someTime/get', (req, res) =>{
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const sqlQuery = 'SELECT * FROM user_play_info WHERE start_time BETWEEN ? AND ? ';
    const pool = mysql.createConnection(dbConfig);
    params = [startTime, endTime]

    pool.connect();
    pool.query(sqlQuery, params, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询播放视频的用户失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '查询播放视频的用户成功',
                playUsers: data
            })
        }
    })
    pool.end();
});




//获取一分钟内播放视频
Routor.get('/video/now/get', (req, res) =>{
    const oneMinsAgeTime = req.query.oneMinsAgeTime;
    sqlQueryPlay = 'SELECT DISTINCT video_id, video_name, video_url FROM play_video_data WHERE now_time >= ?';
    sqlQueryUser = 'SELECT DISTINCT user_id, user_name, video_id, video_name, video_url FROM play_video_data WHERE now_time >= ?';

    const pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQueryPlay, oneMinsAgeTime, (err, data) => {
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询用户视频播放信息失败',
            })
        }else{
            nowPlayVideos = data;
            for(let i = 0; i < nowPlayVideos.length; i++){
                nowPlayVideos[i].userCount = 0;
            }
            pool.query(sqlQueryUser, oneMinsAgeTime, (err,data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 51,
                        msg: '查询用户视频播放信息失败',
                    })
                }else{
                    nowPlay = [];
                    nowPlayUsers = data;
                    for(let i = 0; i < nowPlayVideos.length; i++){
                        for(let j = 0; j < nowPlayUsers.length; j++){
                            if(nowPlayVideos[i].video_id == nowPlayUsers[j].video_id){
                                nowPlayVideos[i].userCount ++
                            }
                        }
                    }
                    res.send({
                        success: true,
                        code: 1,
                        msg: '查询用户视频播放信息成功',
                        nowPlayVideos: nowPlayVideos,
                    });
                }
            })
            pool.end();
        }
            
    })
})

//获取当前播放某视频的用户
Routor.get('/play/users/get', (req, res) =>{
    const data = req.query;
    const sqlQueryUser = 'SELECT DISTINCT user_id, video_id FROM play_video_data WHERE now_time >=? AND video_id = ?';
    const sqlQueryPlay = 'SELECT *FROM user_play_info WHERE start_date = ? AND video_id = ?'
    const paramsUser = [data.nowTime, data.videoId]
    const paramsPlay = [data.today, data.videoId]
    const pool = mysql.createConnection(dbConfig);
    pool.query(sqlQueryUser, paramsUser, (err, data) =>{
        if(err){
            console.log(err)
            res.send({
                success: false,
                code: 50,
                msg: '查询正在用户失败'
            })
        }else{
            // console.log(sqlQueryUser);
            nowplayUsers = data;
            pool.query(sqlQueryPlay, paramsPlay, (err, data) =>{
                if(err){
                    console.log(err);
                    res.send({
                        success: false,
                        code: 51,
                        msg: '查询今天播放用户失败'
                    });
                }else{
                    todayPlayUsers = data;
                    playUsers = [];
                    for(let i = 0; i<nowplayUsers.length; i++){
                        for(let j = 0; j < todayPlayUsers.length; j++){
                            if(nowplayUsers[i].user_id == todayPlayUsers[j].user_id){
                                playUsers.push(todayPlayUsers[i])
                            }
                        }
                    }
                    res.send({
                        success: true,
                        code: 1,
                        msg: '获取观看该视频用户成功',
                        playUsers:playUsers
                    });
                }
            })
            pool.end();

        }
    })
    // pool.end();
})
module.exports = Routor;