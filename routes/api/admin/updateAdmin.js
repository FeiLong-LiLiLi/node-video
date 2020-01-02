var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();

Router.post('/',function(req,res){

     //数据缓存
    const admin_id = req.body.admin_id;
    const name = req.body.name;
    const psw = req.body.psw;
    const phone = req.body.phone;
    const email = req.body.email;
    // const creat_time = req.body.creat_time;
    const birth = req.body.birth;
    const sex = req.body.sex;
    const personal_signature = req.body.personal_signature;
    const modify_time = req._startTime;
    //查询是否存在
    const sqlQuery = 'SELECT * FROM admin WHERE admin_id=?';
    const sqlUpdade = 'UPDATE admin SET name=?, phone=?, email=?, sex=?, personal_signature=?, birth=?, modify_time=? WHERE admin_id=?';
    const updateParams = [name, phone, email, sex, personal_signature, birth, modify_time, admin_id];

    var conn = mysql.createConnection(dbConfig);
    conn.connect();

    conn.query(sqlUpdade, updateParams, (err, data) =>{
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '管理员数据更新失败',
                // data: data
            })
        }else{
            conn.query(sqlQuery, admin_id, (err, data) =>{
                if(err){
                    res.send({
                        success: false,
                        code: 40,
                        msg: '管理员数据查询更新失败',
                        // data: data
                    })
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '管理员数据更新成功',
                        admin: data[0]
                    })
                }
            })
            conn.end();      
        }
    })
});


module.exports = Router;