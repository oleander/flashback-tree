var threads = require("./threads");
var traverseTree = require("./traverseTree");
var process = require("process");

threads(process.argv[2], 1, {}, null).then(function(data){
  console.info("digraph graphname { ")
  console.info("overlap=scale;");
  console.info('size="20,20";');
  console.info("nodesep=2.0;");
  traverseTree(data.tree, data.root);
  console.info("}")
}).catch(function(err){
  console.error("error", err);
});

