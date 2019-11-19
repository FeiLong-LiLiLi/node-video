var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


Router.get('/',function(req,res){

    var pool = mysql.createConnection(dbConfig);
    pool.connect();
    const admin_id = req.query.admin_id

    const sqlQuery = 'SELECT * FROM  admin WHERE admin_id = ?';
    const sqlDel = 'DELETE FROM admin WHERE admin_id = ?';

    pool.query(sqlQuery, admin_id, (err, res) =>{
        if(err){
            console.log(err);
        }else if(res.length > 0){
            // console.log(res.length);
            pool.query(sqlDel, admin_id,function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log('管理员'+admin_id+'删除');
                    // result = data;
                }
            })         
            pool.end();  
        }
    });
    res.json(); 

});


module.exports = Router;