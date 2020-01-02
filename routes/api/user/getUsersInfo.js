var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var Router = express.Router();


Router.get('/count',function(req,res){
    const sql = 'select * from  users';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sql, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取用户数量失败',
                // data: {}
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取用户数量成功',
                total: data.length,
                // users: data
            })
        }
    })
    pool.end();
});

Router.get('/all', function(req, res){
    const reqData = req.query;
    const page = parseInt(req.query.page);
    const num = parseInt(reqData.num);

    const sqlUsers = 'select * from users limit ?,?'
    const params = [page*num, num]
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlUsers, params, (err,data) => {
        if(err){
            // console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '获取用户信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取用户信息成功',
                users: data
            })
        }
    })
    pool.end();
    
})


Router.get('/sex', function(req, res){

    sqlSex ='select * from users';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlSex, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取用户性别失败',
            })
        }else{
            const sexData = [];
            var male = 0, female = 0, secrecy = 0;
            //获取性别
            for(var i = 0; i<data.length; i++){
                // console.log(typeof(data[i].sex));
                if(typeof(data[i].sex) == 'object'){
                    data[i].sex = '';
                    sexData.push(data[i].sex);
                }else{
                    sexData.push(data[i].sex);
                }  
            }
            //性别分类
            for(var j = 0; j < sexData.length; j++){
                if(sexData[j] == '男'){
                    male++;
                }else if(sexData[j] == '女'){
                    female++;
                }else{
                    secrecy++;
                }
            }

            res.send({
                success: true,
                code: 1,
                msg: '获取用户性别成功',
                sex: {
                    male: male,
                    female: female,
                    secrecy: secrecy
                }
            })
        }
    })
    pool.end();

})


module.exports = Router;