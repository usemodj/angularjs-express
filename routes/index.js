
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { articles: articles, title: 'AngularJS Express App' })
};