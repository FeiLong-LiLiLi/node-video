var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../config/mysql');
// var category = require('../../controller/video/category')


var Router = express.Router();


Router.get('/get',function(req,res){
    
    const sql = 'SELECT * FROM  categories';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sql, (err,data) => {
        if(err){
            res.json({
                success: false,
                code: 50,
                msg: '获取类别信息失败',
                categories: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '获取类别信息成功',
                total: data.length,
                categories: data
            })
        }
    })
    pool.end();
})

Router.post('/add', function(req, res){
    const category = req.body.category;
    const sqlInsert = 'INSERT INTO CATEGORIES (VALUE, LABLE) VALUES(?,?)'
    params = [category, category]
    var pool = mysql.createConnection(dbConfig);

    pool.connect()
    pool.query(sqlInsert, params, (err,data) => {
        if(err){
            console.log(err)
            res.json({
                success: false,
                code: 50,
                msg: '添加类别失败',
                categories: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '添加类别成功',
            })
        }
    })
    pool.end();
})

Router.get('/del', function(req, res){
    const category = req.query.category;
    const sqlDel = 'DELETE FROM CATEGORIES WHERE VALUE =?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlDel, category, (err,data) => {
        if(err){
            console.log(err)
            res.json({
                success: false,
                code: 50,
                msg: '删除类别失败',
                categories: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '删除类别成功',
            })
        }
    })
    pool.end();
})

Router.post('/query',function(req,res){
    
    const category = req.body.category;
    const sqlQuery = 'SELECT * FROM  CATEGORIES WHERE VALUE LIKE ' + '\"%'+ category +'%\" ';
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.json({
                success: false,
                code: 50,
                msg: '查询类别失败',
                categories: "" 
            })
        }else{
            console.log(data);
            res.json({
                success: true,
                code: 1,
                msg: '查询类别成功',
                total: data.length,
                categories: data
            })
        }
    })
    pool.end();
})


module.exports = Router;