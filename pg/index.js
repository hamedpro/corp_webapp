var http = require('http');

var options = {
  host: 'localhost',
  port:4000,
  path : "/",
  method:"GET"
};

http.request(options, response=>{
    var str = '';

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end',function(){
        console.log(str);
    });
}).end();