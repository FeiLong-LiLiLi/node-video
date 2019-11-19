var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);

    // //数据缓存
    const user_id = req.body.user_id;
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
    const sex = req.body.sex;
    const personal_signature = req.body.personal_signature;
    // //连接数据库
    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    //查询是否存在
    const sqlQuery = 'SELECT * FROM users WHERE user_id=?';
    const sqlUpdade = 'UPDATE users SET name=?, age=?, phone=?, email=?, sex=?, personal_signature=? WHERE user_id=?';
    const updateParams = [name, age, phone, email, sex, personal_signature, user_id];
    pool.query(sqlQuery, user_id, function(err, data){
        if(err){
            console.log(err);
        }else if(data.length > 0){
            //更新数据
            pool.query(sqlUpdade, updateParams, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log('id为'+ user_id + '用户已更新');
                }
            });
            pool.end();      
        }
    });   
    res.json();
});


//弃用
// Router.get('/',function(req,res){

//     var pool = mysql.createConnection(dbConfig);
//     pool.connect();
//     //接收请求的值
//     const user_id = req.query.user_id;
//     const name = req.query.name;
//     var sql = 'UPDATE users SET name=?, age=? WHERE user_id=?';
//     const updateParams = [name, 11, user_id]
//     pool.query(sql, updateParams, function(err,data){
//         if(err){
//             console.log('失败');
//             // console.log(err);
//         }else{
//             console.log('用户'+user_id+'更新');
//             // result = data;
//         }
//     })
//     pool.end();
//     // console.log(req.query);
//     res.send();
    
// })


module.exports = Router;