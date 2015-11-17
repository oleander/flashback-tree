var iconv = require("iconv-lite");
var request = require("request");

function encode(content) {
  return iconv.decode(new Buffer(content), "latin1");
}

module.exports = function(url) {
  return new Promise(function(resolve, reject) {
    request({ url: url, encoding: null }, function(error, response, body){
      if(error) { return reject(error); }
      if(response.statusCode > 299) { return reject(response.statusCode); }
      resolve(encode(body));
    });
  });
}