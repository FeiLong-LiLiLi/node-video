var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入

    var result = {

    };
    const admin_id = req.body.admin_id;
    const name = req.body.name;
    const password = req.body.password;
    const phone = req.body.phone;
    const email = req.body.email;
    // const creat_time = req.body.creat_time;
    const birth = req.body.birth;
    const sex = req.body.sex;
    const personal_signature = req.body.personal_signature;
    //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    
    //查询id是否存在， 同理可用于判断是否存在邮箱
    const sqlQuery = 'SELECT * FROM  admin WHERE admin_id = ?';
    const sqlInsert = 'INSERT INTO admin (admin_id, name, password, phone, email, sex, personal_signature) VALUES(?,?,?,?,?,?,?)';
    const addParams = [admin_id, name, password, phone, email, sex, personal_signature];
    pool.query(sqlQuery, admin_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            console.log('id已经存在');
            result.status = 500;
            // res.json(result)
        }else{    
            pool.query(sqlInsert, addParams, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    result.status = 200;
                    console.log('管理员'+ name +'添加成功');
                }
            });
            pool.end();             
        }
    })
    // console.log(result);
    res.send(result);
});

module.exports = Router;
