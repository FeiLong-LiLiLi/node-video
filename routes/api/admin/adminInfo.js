var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');

var router = express.Router();

router.get('/count',function(req,res,next){

    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    
    var sql = 'SELECT * FROM  admin';
    conn.query(sql, (err,data) => {
        if(err){
           res.send({
               success: false,
               code: 50,
               msg: '获取管理员数量失败',
            //    data: data
           })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取管理员数量成功',
                total: data.length,
            })
        }
    })
    conn.end();
})


router.get('/all', function(req, res){
    const reqData = req.query;
    const page = parseInt(req.query.page);
    const num = parseInt(reqData.num);

    const sqladmins = 'select * from admin limit ?,?'
    const params = [page*num, num]
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqladmins, params, (err,data) => {
        if(err){
            // console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '获取管理员信息失败',
            })
        }else{
            res.send({
                success: true,
                code: 1,
                msg: '获取管理员信息成功',
                admins: data
            })
        }
    })
    pool.end();
    
})

router.get('/sex', function(req, res){

    sqlSex ='select * from admin';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlSex, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '获取管理员性别失败',
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
                msg: '获取管理员性别成功',
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

module.exports = router;