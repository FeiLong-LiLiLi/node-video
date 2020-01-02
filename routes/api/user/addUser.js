var express = require('express');
var uuid = require('node-uuid')
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入
    const uid = uuid.v1();
    const user_id = uid.replace(/\-/g, '');
    const name = req.body.name;
    const psw = req.body.psw;
    const phone = req.body.phone;
    const email = req.body.email;
    const creat_time = req._startTime;
    const sex = '';
    
    //查询id是否存在， 同理可用于判断是否存在邮箱
    const sqlQuery = 'SELECT * FROM  users WHERE user_id = ?'
    const sqlInsert = 'INSERT INTO users (user_id, name, psw, phone, email, creat_time) VALUES(?,?,?,?,?,?)'
    const addParams = [user_id, name, psw, phone, email, creat_time];

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlInsert, addParams,(err) =>{   
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '创建用户失败',
                // data: {}
            })
        }else{
            pool.query(sqlQuery, user_id, (err, data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 40,
                        msg: '查询创建用户失败',
                    })
                }else{
                    // console.log(typeof(sex));
                    res.send({
                        success: true,
                        code: 1,
                        msg: '创建用户成功',
                        data: data[0]
                    })
                } 
            })
            pool.end()
        }
    })

});

module.exports = Router;

