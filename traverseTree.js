var traverse = function(tree, root) {
  var subTree = tree[root];
  delete tree[root];
  for(var node in subTree) {
    console.info(node + " -> " + root + " [penwidth=1] ; ");
    traverse(tree, node);
  }
}

module.exports = traverse;