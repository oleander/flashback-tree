var threads = require("./threads");

threads("https://www.flashback.org/t2648395").then(function(posts){
  console.info("posts ===> ", posts);
}).catch(function(err){
  console.info("error", err);
})