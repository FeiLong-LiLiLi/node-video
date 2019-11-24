// var mysql = require('mysql')

mysql = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'videodata',
    connectionLimit: 100, 
    useConnectionPooling: true // 使用连接池
}

// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123',
//     database: 'videodata',
//     connectionLimit: 100,
// })


module.exports = mysql;




// const mysql = require('mysql');
 
// module.exports = {
//     config: {
//         host: 'localhost',
//         port: 3306,
//         database: 'glory_of_kings',
//         user: 'root',
//         password: 'root',
//         useConnectionPooling: true // 使用连接池
//     },
//     pool: null,
//     /**
//      * 创建连接池
//      */
//     create: function () {
//         const me = this;
//         // 没有pool的才创建
//         if (!me.pool) {
//             me.pool = mysql.createPool(me.config);
//         }
//     },
//     /**
//      * 执行sql
//      * @param {Object} config 操作对象
//      */
//     exec: function (config) {
//         const me = this;
//         me.create();
//         me.pool.getConnection((err, conn) => {
//             if (err) {
//                 console.log('mysql pool getConnections err:' + err);
//                 throw err;
//             } else {
//                 conn.query(config.sql, config.params, (err, result) => {
//                     if (config.success) {
//                         config.success(result);
//                     }
//                     if (config.error) {
//                         config.error(err)
//                     }
//                     // 释放连接到连接池
//                     conn.release();
//                 });
//             }
//         });
//     }
// }