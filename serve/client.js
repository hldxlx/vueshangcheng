var http = require('http');
// let util = require('util');
http.get('http://www.imooc.com/u/card',function(res){
  let data = "";
  res.on("data",function(chunk){
    data += chunk;
  });
  res.on("end",function(){
    // let result = JSON.parse(data);
    // util.inspect(result);

    // console.log(util.inspect(result));
    console.log(data);
    console.log( JSON.parse(JSON.stringify(data)))
  });
});

