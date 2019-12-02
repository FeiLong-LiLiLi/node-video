var express = require('express');
var uuid = require('node-uuid');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入
    const uid = uuid.v1();
    const admin_id = uid.replace(/\-/g, '');
    const name = req.body.name;
    const psw = req.body.psw;
    const phone = req.body.phone;
    const email = req.body.email;
    const creat_time = req._startTime;
    // const birth = req.body.birth;
    // const sex = req.body.sex;
    // const personal_signature = req.body.personal_signature;

    const sqlQuery = 'SELECT * FROM  admin WHERE admin_id = ?';
    const sqlInsert = 'INSERT INTO admin (admin_id, name, psw, phone, email, creat_time) VALUES(?,?,?,?,?,?)';
    const addParams = [admin_id, name, psw, phone, email, creat_time];
    

    //连接数据库
    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(sqlInsert, addParams, (err, data) => {
        if(err){
            res.json({
                code: 50,
                msg: '添加管理员失败',
                // data: data
            })
        }else{
            conn.query(sqlQuery, admin_id, (err, data) => {
                if(err){
                    res.json({
                        code: 50,
                        msg: '查询添加管理员失败',
                        // data: {}
                    })
                }else{
                    res.json({
                        code: 1,
                        msg: '添加管理员成功',
                        data: data[0]
                    })
                }
            })
            conn.end()
        }
    })
    

});

module.exports = Router;
