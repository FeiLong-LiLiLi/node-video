var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


Router.get('/',function(req,res){

    const video_id = req.query.video_id;
    const sqlQuery = 'SELECT * FROM  video WHERE video_id =?';
    const sqlDel = 'DELETE FROM video WHERE video_id =?';

    var pool = mysql.createConnection(dbConfig);
    pool.connect();

    pool.query(sqlQuery, video_id, (err, res) =>{
        if(err){
            console.log(err);
        }else if(res.length > 0){
            // console.log(res.length);
            pool.query(sqlDel, video_id,function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log('视频'+video_id+'删除');
                    // result = data;
                }
            })         
            pool.end();  
        }
    });
    res.json(); 

});


module.exports = Router;