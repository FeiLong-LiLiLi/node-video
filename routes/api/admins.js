var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../config/mysql');
var uuid  = require('node-uuid')



var Router = express.Router();


Router.post('/login',(req,res) => {
    
    var reqData = req.body;
    // var userName = req.body.name;
    // var userName = req.body.name;
    // var userPSW = req.body.psw;
    const queryEmail = 'select * from admin where email = ?'
   
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(queryEmail, reqData.email, (err,data) => {
        if(err){
            console.log(err)
            res.send({

                success: false,
                code: 50,
                msg: '登录失败'
            })
        }else{
            if(data.length == 0){
                res.send({
                    success: false,
                    code: 40,
                    msg: '用户不存在'
                })
            }else if(data[0].psw == reqData.psw){
                res.send({
                    success: true,
                    code: 1,
                    msg: '登录成功'
                })
            }else{
                res.send({
                    success: false,
                    code: 30,
                    msg: '密码错误'
                })
            }

                
         
        }
    })
    pool.end();
})

// Router.post('/register', (req, res) =>{
//     const reqData = req.body;
//     const uid = uuid.v1();
//     const user_id = uid.replace(/\-/g, '');
//     const creat_time = req._startTime;

//     const queryEmail = 'select * from users where email =? '
//     const queryPhone = 'select * from users where phone =?'
//     const insertUser = 'insert into  users(user_id, name, phone, email, psw, creat_time) values (?,?,?,?,?,?)'
//     params = [user_id, reqData.name, reqData.phone, reqData.email, reqData.psw, creat_time];
//     // console.log(reqData.email);

//     var pool = mysql.createConnection(dbConfig);
//     pool.connect()
//     pool.query(queryEmail, reqData.email, (err, data) =>{
//         if(err){
//             res.send({
//                 success: false,
//                 code: 50,
//                 msg: '注册失败'
//             })
//         }else if(data.length > 0){
//             res.send({
//                 success: false,
//                 code: 40,
//                 msg: '邮箱已注册'
//             })
//         }else{
//             pool.query(queryPhone, reqData.phone, (err, data) => {
//                 if(err){
//                     res.send({
//                         success: false,
//                         code: 50,
//                         msg: '注册失败'
//                     })
//                 }else if(data.length > 0){
//                     res.send({
//                         success: false,
//                         code: 30,
//                         msg: '手机号已注册'
//                     })
//                 }else{
//                     pool.query(insertUser, params, (err, data) => {
//                         if(err){
//                             res.send({
//                                 success: false,
//                                 code: 50,
//                                 msg: '注册失败'
//                             })
//                         }else{
//                             res.send({
//                                 success: true,
//                                 code: 1,
//                                 msg: '注册成功'
//                             })
//                         }
//                     })
//                     pool.end()
//                 }
//             })
//         }
//     })

// })


module.exports = Router;