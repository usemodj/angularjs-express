
/**
 * Module dependencies.
  * https://github.com/senchalabs/connect#middleware
  * Migrating  Express from 3.x to 4.x: 
  *  https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
 */

var express = require('express');
var session  = require('express-session');
var errorHandler = require('errorhandler');
//var http = require('http');
var path = require('path');
var mysql = require('mysql');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var router = express.Router();
var app = express();

// Configuration
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : 'root',
  database:'express_mysql_mvc_dev'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

// all environments
app.set('port', process.env.APP_PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.engine('html', require('jade').renderFile);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(require('method-override')());
app.use( cookieParser('optional secret string'));
app.use(session({ secret: 'your secret here', key: 'sid', cookie:{ secure: true}}));
   //app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
//if (app.get('env') === 'development') {  
  // development only
  app.set('views', __dirname + '/app');
  app.use(express.static(__dirname + '/app'));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
else {
  // production
  app.set('views', __dirname + '/dist');
  app.use(express.static(__dirname + '/dist'));
  app.use(errorHandler());
};

// Routes 
app.use('/', routes);
//app.use('/articles', routes);

// app.get('/home', routes.index);
app.use('/home', function(req, res, next){
  console.log('redirect to /');
  res.redirect('/');
});

// app.use(function(req, res, next){
//   console.log('redirect to /home');
//   res.redirect('/home');
//   //next();
// });

app.get('/articles', function(req, res){
  connection.query('SELECT * FROM article', function(err, rows){
    console.log( rows);
    //res.render('index.html', {articles : rows, title: 'MySQL Rows'});
    res.json(rows);
  });
});

module.exports = app;
module.exports.router = router;

//http.createServer(app).listen(app.get('port'), function(){
var server = app.listen(app.get('port'), function(){
  // Run production mode: $> NODE_ENV=production  node app.js
  console.log("Express server listening on port %d in %s mode", server.address().port, app.get('env'));
});
