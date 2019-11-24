var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


Router.get('/',function(req,res){

    
    const user_id = req.query.user_id
    const sqlQuery = 'SELECT * FROM  users WHERE user_id = ?';
    const sqlDel = 'DELETE FROM users WHERE user_id = ?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    pool.query(sqlDel, user_id, (err, data) => {
        if(err){ 
            res.json({
                code: 50,
                msg: '删除用户失败',
                data: data.affectedRows
            })
        }else{
            res.json({
                code: 1,
                msg: '删除用户成功',
                data: data.affectedRows
            })
        }  
    })
    pool.end()
    // pool.query(sqlQuery, user_id, (err, res) =>{
    //     if(err){
    //         console.log(err);
    //     }else if(res.length > 0){
    //         // console.log(res.length);
    //         pool.query(sqlDel, user_id,function(err,data){
    //             if(err){
    //                 console.log(err);
    //             }else{
    //                 console.log('用户'+user_id+'删除');
    //                 // result = data;
    //             }
    //         })         
    //         pool.end();  
    //     }
    // });
    // res.json(); 

});


module.exports = Router;