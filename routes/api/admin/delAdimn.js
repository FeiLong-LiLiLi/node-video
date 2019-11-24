var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../../config/mysql');


var Router = express.Router();


Router.get('/',function(req,res){

    const admin_id = req.query.admin_id;
    const sqlQuery = 'SELECT * FROM  admin WHERE admin_id = ?';
    const sqlDel = 'DELETE FROM admin WHERE admin_id = ?';

    var conn = mysql.createConnection(dbConfig);
    conn.connect();
    conn.query(sqlDel, admin_id, (err, data) =>{
        if(err){
            res.json({
                code: 50,
                msg: '管理员删除失败',
                data: data.affectedRows
            })
        }else{
            res.json({
                code: 1,
                msg: '管理员删除成功',
                data: data.affectedRows
            })
        }
    })
    conn.end()

});


module.exports = Router;