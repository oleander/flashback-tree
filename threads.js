var get = require("./get");
var cheerio = require("cheerio");

var getPosts = function(url, page, working, root, maxPages) {
  return get(url + "p" + page).then(function(body) {
    var $ = cheerio.load(body);
    var result = $(".delim").text().match(/Sidan (\d+) av (\d+)/);
    if(!root && page == 1) {
      root = "p" + $("table.post").first().find(".post_message").attr("id").split("_")[2];
    }

    if(!root) {
      throw "no root node found on page " + page;
    }

    if(!working[root]) {
      working[root] = {};
    }

    $("table.post").each(function(index, post) {
      var id = "p" + $(this).find(".post_message").attr("id").split("_")[2];
      // Ignore root node
      if(id == root) { return; }
      var hrefs = $(this).find(".post-quote > div > a").map(function(){
        return $(this).attr("href");
      }).get();

      if(!hrefs.length) {
        working[root][id] = 1;
      }

      for (var i = hrefs.length - 1; i >= 0; i--) {
        cit = hrefs[i];
        if(cit.match(/p\d+/)) {
          ccid = cit.split("#")[1];
          if(!working[ccid]){
            working[ccid] = {};
          }
          working[ccid][id] = 1;
        }
      };
    });

    // Abort if last page
    if(!result || result[1] === result[2] || maxPages === 0){
      return { tree: working, root: root };
    }

    if(maxPages) {
      maxPages--;
    }

    return getPosts(url, page + 1, working, root, maxPages);
  });
};

module.exports = getPosts;