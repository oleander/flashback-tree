var get = require("./get");
var cheerio = require("cheerio");

var getPosts = function(url, page, working) {
  page = page || 1;
  working = working || {};
  console.info("page", page)
  return get(url + "p" + page).then(function(body) {
    var $ = cheerio.load(body);
    var result = $(".delim").text().match(/Sidan (\d+) av (\d+)/);
    var posts = [];
    $("table.post").each(function(index, post) {
      var id = "p" + $(this).find(".post_message").attr("id").split("_")[2];
      var cit = $(this).find(".alt2.post-quote > div > a").attr("href");
      if(cit) {
        var ccid = cit.split("#")[1]
        if(!working[ccid]){
          working[ccid] = [];
        }
        working[ccid].push(id);
      } else {
        if(!working.root) {
          working.root = [];
        }
        working.root.push(id);
      }
    });

    if(result[1] === result[2]){
      return working;
    }

    return getPosts(url, page + 1, working);
  });
};

module.exports = getPosts;