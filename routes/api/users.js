var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../config/mysql');
var uuid  = require('node-uuid')



var Router = express.Router();


Router.post('/login',(req,res) => {

    // console.log(req.body);
    // const reqData = req.body;
    const userEmail = req.body.email;
    const userPSW = req.body.psw;
    const sqlEmail = 'select * from users where email =?'
    // const param = [reqData.user, reqData.password, reqData.email];


    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlEmail, userEmail, (err,data) => {
        if(err){
            console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '查询错误',
            })
        }else{
            if(data.length == 0){
                res.send({
                    success: false,
                    code: 50,
                    msg: '用户不存在',
                })
            }else if(data[0].psw == userPSW){
                res.send({
                    success: true,
                    code: 1,
                    msg: '登录成功',
                    user: data[0]
            
                })
            }else{
                res.send({
                    success: false,
                    code: 50,
                    msg: '密码错误',
            
                })
            }     
        }
    })
    pool.end();

    // const sqlPSW = 
    // const sql = 'SELECT * FROM  TAGS';
    // const sqlQuery = 'SELECT * FROM  users WHERE user_id = ?';
    // const reqData = JSON.parse(data.loginData); //login的数据，姓名，密码，邮箱
    // var userName = reqData.user;
    // var userPSW = reqData.password;
    // var userEmail= reqData.email;
    // const selectSql = 'select * from users where name=?&&psw=?&&email=?'
    // var  param = [reqData.user, reqData.password, reqData.email];
    // pool.query(selectSql, param, (err,data) => {
    //     if(err){
    //         console.log('select err: ',err.message);
    //         return;
    //     }
    //     if(data.length==1){
    //         res.send({
    //              success: true,
    //              code: 1,
    //              msg: ''
    //             //  msg:data[0].name,
    //             //  id:data[0].user_id
    //             })
    //     }else{
    //         res.send({
    //             success: false,
    //             code: 0,
    //             msg: '请重试'
    //         });
    //     }
    // });
})

Router.post('/register', (req, res) =>{
    // console.log(req.body);
    const reqData = req.body;
    const uid = uuid.v1();
    const user_id = uid.replace(/\-/g, '');
    const creat_time = req._startTime;

    const queryEmail = 'select * from users where email =? '
    const queryPhone = 'select * from users where phone =? '
    const insertUser = 'insert into  users(user_id, name,  psw, phone, email, creat_time) values (?,?,?,?,?,?)'
    params = [user_id, reqData.name, reqData.psw, reqData.phone, reqData.email, creat_time];

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(queryEmail, reqData.email, (err, data) =>{
        if(err){
            // console.log(err)
            res.send({
                success: false,
                code: 51,
                msg: '注册失败'
            })
        }else if(data.length > 0){
            res.send({
                success: false,
                code: 40,
                msg: '邮箱已注册'
            })
        }else{
            pool.query(queryPhone, reqData.phone, (err, data) => {
                if(err){
                    // console.log(err)
                    res.send({
                        success: false,
                        code:52,
                        msg: '注册失败'
                    })
                }else if(data.length > 0){
                    res.send({
                        success: false,
                        code:30,
                        msg: '手机号已注册'
                    })
                }else{
                    pool.query(insertUser, params, (err, data) => {
                        if(err){
            
                            res.send({
                                success: false,
                                code:53,
                                msg: '注册失败'
                            })
                        }else{
                            res.send({
                                success: true,
                                code: 1,
                                msg: '注册成功',
                                user: reqData
                            })
                        }
                    })
                    pool.end()
                }
            })
        }
    })
})


module.exports = Router;