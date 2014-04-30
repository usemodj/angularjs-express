
/**
 * Module dependencies.
  * https://github.com/senchalabs/connect#middleware
  * Migrating  Express from 3.x to 4.x: 
  *  https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x
 */

var express = require('express')
  , cookieParser = require('cookie-parser')
  , session  = require('express-session')
  , errorHandler = require('errorhandler')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');


var app = express();
var router = express.Router();

// Configuration

// all environments
  app.set('port', process.env.APP_PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.engine('html', require('jade').renderFile);
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(require('body-parser')());
  app.use(require('method-override')());
  app.use( cookieParser('optional secret string'));
  app.use(session({ secret: 'your secret here', key: 'sid', cookie:{ secure: true}}));
   //app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
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
app.get('/', routes.index);

app.get('/home', routes.index);
app.use('/main', function(req, res, next){
  console.log('redirect to /');
  res.redirect('/');
});

app.use(function(req, res, next){
  console.log('redirect to /home');
  res.redirect('/home');
  //next();
});

module.exports = app;
module.exports.router = router;

http.createServer(app).listen(app.get('port'), function(){
  // Run production mode: $> NODE_ENV=production  node app.js
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
