var threads = require("./threads");
var traverseTree = require("./traverseTree");
threads("https://www.flashback.org/t2647929", 1, {}, null).then(function(data){
  console.info("digraph graphname { ")
  console.info("overlap=scale;");
  console.info('size="7.75,10.25";');
  console.info("nodesep=2.0;");
  traverseTree(data.tree, data.root);
  console.info("}")
}).catch(function(err){
  console.info("error", err);
});

