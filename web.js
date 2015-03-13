
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var mongodbDemo = require('./routes/mongodbDemo');
var ftest = require('./routes/ftest');

var http = require('http');
var path = require('path');

var settings = require('./settings');

//純粹當 session store，因為 monk 不知如何設定成express session
var MongoStore = require('connect-mongo')(express);

var monk = require('monk');
var dbevents = monk('172.17.24.196:40000/test');


var partials = require('express-partials');
var flash = require('connect-flash');

var sessionStore = new MongoStore({
						db : settings.db
					}, function() {
							console.log('connect mongodb success...');
					});

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
//app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
		secret : settings.cookie_secret,
		cookie : {
			maxAge : 60000 * 20	//20 minutes
		},
		store : sessionStore
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/ftest', ftest.page);
app.get('/ftest1', ftest.insert1(dbevents));
app.get('/ftest2', ftest.insert2(dbevents));
app.get('/ftest3', ftest.insert3(dbevents));

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台?出
    {
      type: 'file', //文件?出
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups:3,
      category: 'normal' 
    }
  ],
  replaceConsole:true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
