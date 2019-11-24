var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);

    // //数据缓存
    const user_id = req.body.user_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const sex = req.body.sex;
    const birth = req.body.birth;
    const personal_signature = req.body.personal_signature;
    const modify_time = req._startTime;

    //查询是否存在
    const sqlQuery = 'SELECT * FROM users WHERE user_id=?';
    const sqlUpdade = 'UPDATE users SET name=?, phone=?, email=?, sex=?, personal_signature=?, birth=?, modify_time=? WHERE user_id=?';
    const updateParams = [name, phone, email, sex, personal_signature, birth, modify_time, user_id];

    // //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlUpdade, updateParams, (err, data) => {
        if(err){
            console.log(err);
            
            res.json({
                code: 50,
                msg: '用户更新失败',
                data: data
            })
        }else{
            pool.query(sqlQuery, user_id, (err, data) => {
                if(err){
                    res.json({
                        code: 50,
                        msg: '查询更新用户失败',
                        data: {}
                    })
                }else{
                    res.json({
                        code: 1,
                        msg: '用户更新成功',
                        data: data
                    })
                }
            })
            pool.end()
        }
    })
   

    // pool.query(sqlQuery, user_id, function(err, data){
    //     if(err){
    //         console.log(err);
    //     }else if(data.length > 0){
    //         //更新数据
    //         pool.query(sqlUpdade, updateParams, function(err, data){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('id为'+ user_id + '用户已更新');
    //             }
    //         });
    //         pool.end();      
    //     }
    // });   
    // res.json();
});


module.exports = Router;