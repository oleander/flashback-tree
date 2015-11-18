var toHex = function(id){
  return "i" + parseInt(id.split("p")[1], 10).toString(16);
}

var traverse = function(tree, root) {
  for(var node in tree[root]) {
    console.info(toHex(tree[root][node]) + " -> " + toHex(root) + " [penwidth=1] ; ");
    traverse(tree, tree[root][node]);
  }
}

module.exports = traverse;