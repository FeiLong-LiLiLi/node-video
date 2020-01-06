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
    // res.end();

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
})


module.exports = Routor;