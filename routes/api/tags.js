var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../config/mysql');
// var category = require('../../controller/video/category')


var Router = express.Router();


Router.get('/get',function(req,res){
    
    const sql = 'SELECT * FROM  TAGS';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sql, (err,data) => {
        if(err){
            res.json({
                success: false,
                code: 50,
                msg: '获取标签信息失败',
                tags: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '获取标签信息成功',
                total: data.length,
                tags: data
            })
        }
    })
    pool.end();
})

Router.post('/add', function(req, res){
    const tag = req.body.tag;
    const sqlInsert = 'INSERT INTO TAGS (VALUE, LABLE) VALUES(?,?)'
    params = [tag, tag]
    var pool = mysql.createConnection(dbConfig);

    pool.connect()
    pool.query(sqlInsert, params, (err,data) => {
        if(err){
            console.log(err)
            res.json({
                success: false,
                code: 50,
                msg: '添加标签失败',
                tags: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '添加标签成功',
            })
        }
    })
    pool.end();
})

Router.get('/del', function(req, res){
    const tag = req.query.tag;
    const sqlDel = 'DELETE FROM TAGS WHERE VALUE =?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect()
    pool.query(sqlDel, tag, (err,data) => {
        if(err){
            console.log(err)
            res.json({
                success: false,
                code: 50,
                msg: '删除标签失败',
                // tags: ""
            })
        }else{
            res.json({
                success: true,
                code: 1,
                msg: '删除标签成功',
            })
        }
    })
    pool.end();
})

Router.post('/query',function(req,res){
    
    const tag = req.body.tag;
    const sqlQuery = 'SELECT * FROM  TAGS WHERE VALUE LIKE ' + '\"%'+ tag +'%\" ';
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.json({
                success: false,
                code: 50,
                msg: '查询标签失败',
                tags: "" 
            })
        }else{
            // console.log(data);
            res.json({
                success: true,
                code: 1,
                msg: '查询标签成功',
                total: data.length,
                tags: data
            })
        }
    })
    pool.end();
})


module.exports = Router;