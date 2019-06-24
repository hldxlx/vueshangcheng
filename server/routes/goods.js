var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//mail 数据库名称
mongoose.connect('mongodb://127.0.0.1:27017/mall');

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
  // Goods.find({},function(err,doc){
  //   if(err){
  //     res.json({
  //         status:'1',
  //         msg:err.message
  //     })
  //   }else{
  //     res.json({
  //       status:'0',
  //       msg:'',
  //       result:{
  //         count:doc.length,
  //         list:doc
  //       }
  //     });
  //   }
  // });
  res.send("656526565656")//此时则在页面显示656526565656
})
module.exports = router;
