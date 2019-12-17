var express = require('express')
var queryString = require('querystring')
var http = require('http')

var Routor = express.Router();

Routor.post('/info',(req, res) =>{

    console.log(req.ip);
    // console.log('---------------分割线1---------------')
    // console.log(req.body);
    // console.log(req.body.flowData);
    // console.log(typeof(req.body.flowData));
    var dataObj = JSON.parse(req.body.flowData);
    // console.log('---------------分割线2---------------');
    // // console,log(dataObj);
    // // console.log(typeof(dataObj));
    console.log(dataObj);
    
    // // var dataArr=new Array();
    // const dataArr = [];
    // // dataArr[0] = '1';
    // // dataArr[1] = '2';

    // console.log(typeof(dataArr))
    // // console.log(dataArr)
    // // dataArr.push(dataObj)
    // console.log(dataArr.length);

    // console.log('111')
    // var data = '';
    // req.on('data', (chunk) => {
    //     data += chunk;
    //     console.log(data);
    //     // console.log('111')
    // })

    // req.on('end', () =>{
    //     // console.log('1111111111')
    //     // console.log(queryString.parse(data))
    //     res.end();
    // })

    res.end();

})
Routor.get('get', (req, res) => {
    
    })


module.exports = Routor;