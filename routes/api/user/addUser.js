var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();

Router.post('/',function(req,res){
    // console.log(req.body);
    //数据传入

    var result = {

    };
    const user_id = req.body.user_id;
    const name = req.body.name;
    const age = req.body.age;
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
    const sqlQuery = 'SELECT * FROM  users WHERE user_id = ?';
    const sqlInsert = 'INSERT INTO users (user_id, name, age, phone, email, sex, personal_signature) VALUES(?,?,?,?,?,?,?)';
    const addParams = [user_id, name, age, phone, email, sex, personal_signature];
    pool.query(sqlQuery, user_id, function(err, data){
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
                    console.log('用户'+ name +'添加成功');
                }
            });
            pool.end();             
        }
    })
    // console.log(result);
    res.send(result);
});

module.exports = Router;



// Router.get('/',function(req,res){

//     var pool = mysql.createConnection(dbConfig);
//     pool.connect();
//     const user_id = req.query.user_id;
//     // const name = req.query.name;
//     var sql = 'INSERT INTO users (user_id, name, age) VALUES(?,?,?)';
//     const addParams = [user_id, '测试用户' + user_id, 22]
//     pool.query(sql, addParams, function(err,data){
//         if(err){
//             console.log('失败');
//             console.log(err);
//         }else{
//             console.log('用户'+user_id+'添加');
//             // result = data;
//         }
//     })
//     pool.end();
//     // console.log(req.query);
//     res.send();
    
// })