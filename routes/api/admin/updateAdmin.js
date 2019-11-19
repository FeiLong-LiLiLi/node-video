var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();

Router.post('/',function(req,res){

     //数据缓存
    const admin_id = req.body.admin_id;
    const name = req.body.name;
    const password = req.body.password;
    const phone = req.body.phone;
    const email = req.body.email;
    // const creat_time = req.body.creat_time;
    const birth = req.body.birth;
    const sex = req.body.sex;
    const personal_signature = req.body.personal_signature;
    // //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    //查询是否存在
    const sqlQuery = 'SELECT * FROM admin WHERE admin_id=?';
    const sqlUpdade = 'UPDATE admin SET name=?, phone=?, email=?, sex=?, personal_signature=? WHERE admin_id=?';
    const updateParams = [name, phone, email, sex, personal_signature, admin_id];
    pool.query(sqlQuery, admin_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            //更新数据
            pool.query(sqlUpdade, updateParams, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log('id为'+ admin_id + '管理员已更新');
                }
            });
            pool.end();      
        }
    });   
    res.json();
});


module.exports = Router;