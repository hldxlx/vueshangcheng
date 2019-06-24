var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//runoob 为mall下的一个数据库名称，里面有一个名为goods的表
mongoose.connect('mongodb://127.0.0.1:27017/runoob');

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success");
})

mongoose.connection.on("error",function(){
  console.log("MongoDB connected fail");
})

mongoose.connection.on("disconnected",function(){
  console.log("MongoDB connected disconnected");
})

router.get("/",function (req,res,next) {
  Goods.find({},function(err,doc){
    if(err){
      res.json({
          status:'1',
          msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc//goods表里面的数据
        }
      });
    }
  });// //此时则在页面显示{"status":"0","msg":"","result":{"count":1,"list":[{"_id":"5d10c86a034e8b368bcbd266","id":"01","name":"kk","cash":"18"}]}}
 // res.send("656526565656")//此时则在页面显示656526565656
})
module.exports = router;
