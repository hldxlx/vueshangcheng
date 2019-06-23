let user = require('./User');
console.log(`userName:${user.userName}`);


let http = require('http');
let url = require('url');
let util = require('util');

let server = http.createServer((req,res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain;charset=utf-8");
  // util.inspect(url.parse(req.url));
  res.end(util.inspect(url.parse(req.url)));
  console.log(url.parse(req.url))
  // url.parse(req.url);

  // res.end(url.parse(req.url));
}).listen(3000,'192.168.1.101',()=>{
  console.log('serve')
})


