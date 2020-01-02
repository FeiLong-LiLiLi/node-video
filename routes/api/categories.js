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
            res.send({
                success: false,
                code: 50,
                msg: '获取类别信息失败'
            })
        }else{
            res.send({
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
            res.send({
                success: false,
                code: 50,
                msg: '添加类别失败',
                categories: ""
            })
        }else{
            res.send({
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

    const sqlQuery = 'SELECT * FROM video WHERE category =?'
    const sqlDel = 'DELETE FROM CATEGORIES WHERE VALUE =?';
    var pool = mysql.createConnection(dbConfig);
    pool.connect()

    pool.query(sqlQuery, category, (err,data) =>{
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询出错，删除类别失败',
            });
        }else if(data.length > 0){
            res.send({
                success: false,
                code: 51,
                msg: '视频中使用了该类别，不可删除',
            });
        }else{
            pool.query(sqlDel, category, (err,data) => {
                if(err){
                    // console.log(err);
                    res.send({
                        success: false,
                        code: 52,
                        msg: '删除类别失败',
                    })
                }else{
                    res.send({
                        success: true,
                        code: 1,
                        msg: '删除类别成功',
                    })
                }
            })
            pool.end();
        }
    })
})

Router.post('/query',function(req,res){
    
    const category = req.body.category;
    const sqlQuery = 'SELECT * FROM  CATEGORIES WHERE VALUE LIKE ' + '\"%'+ category +'%\" ';
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlQuery, (err,data) => {
        if(err){
            res.send({
                success: false,
                code: 50,
                msg: '查询类别失败',
                categories: "" 
            })
        }else{
            console.log(data);
            res.send({
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


Router.get('/num',function(req,res){

    const sqlCategory = 'SELECT * FROM  categories';
    const sqlQuery = 'SELECT * FROM  video';
    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlCategory, (err, data) => {
        if(err){
            console.log(err);
            res.send({
                success: false,
                code: 50,
                msg: '获取视频类别失败',
        
            })
        }else{
            //获取所有类别
            const allCategories = [];
            data.forEach(item => {
                const tableItem = {
                    category: item.value,
                    num: 0
                }
                allCategories.push(tableItem);
            });

            pool.query(sqlQuery, (err,data) => {
                if(err){
                    res.send({
                        success: false,
                        code: 50,
                        msg: '获取视频类别数量失败'
                    })
                }else{
                    //获取所有视频类别
                    const videoCategories = [];
                    for(var j = 0; j < data.length; j++){
                        videoCategories.push(data[j].category)
                    }
                    //分类
                    for(var m = 0; m < videoCategories.length; m++){
                        for(var n = 0; n < allCategories.length; n++){
                            switch(videoCategories[m]){
                                case allCategories[n].category:
                                    allCategories[n].num++;
                                    break;
                            }
                        }
                    }

                    res.send({
                        success: true,
                        code: 1,
                        msg: '获取视频类别数量成功',
                        allCategoriesNum: allCategories
                        // allCategories: allCategories,
                        // videoCategories: videoCategories
                    })
                }
            })
            pool.end()
        }
    })
})


module.exports = Router;