//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');
var ip = require('ip');
var os = require('os');
var fs = require('fs');

exports.page = function(req, res){
  //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
  res.render('index', { title: 'Create log', resp : false});
};

exports.insert1 = function(mongodb){		
	  return function(req, res) {
		var collection = mongodb.get('events');
	  	
		logmsg0 = {level: "warn",	timestamp : new Date(), message: "*****0*****",	host:{ip: ip.address()}};
		logmsg1 = {level: "error",timestamp : new Date(), message: "*****1*****",	host:{ip: ip.address()}};
		logmsg2 = {level: "info",	timestamp : new Date(), message: "*****2*****",	host:{ip: ip.address()}};
		logmsg3 = {level: "warn",	timestamp : new Date(), message: "*****3*****",	host:{ip: ip.address()}};
		logmsg4 = {level: "login",timestamp : new Date(), message: "*****4*****",	host:{ip: ip.address()}};
		logmsg5 = {level: "warn",	timestamp : new Date(), message: "*****5*****",	host:{ip: ip.address()}};
		logmsg6 = {level: "error",timestamp : new Date(), message: "*****6*****",	host:{ip: ip.address()}};
		logmsg7 = {level: "warn",	timestamp : new Date(), message: "*****7*****",	host:{ip: ip.address()}};
		logmsg8 = {level: "warn",	timestamp : new Date(), message: "*****8*****",	host:{ip: ip.address()}};
		logmsg9 = {level: "login",timestamp : new Date(), message: "*****9*****",	host:{ip: ip.address()}};
		
		
		collection.insert(logmsg0,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg1,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg2,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg3,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg4,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg5,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg6,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg7,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg8,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg9,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
    };
};

exports.insert2 = function(mongodb){		
	  return function(req, res) {
		var collection = mongodb.get('events');
	  	
		logmsg0 = {level: "warn",	timestamp : new Date(), message: "*****0*****",	host:{ip: ip.address()}};
		logmsg1 = {level: "error",timestamp : new Date(), message: "*****1*****",	host:{ip: ip.address()}};
		logmsg2 = {level: "info",	timestamp : new Date(), message: "*****2*****",	host:{ip: ip.address()}};
		logmsg3 = {level: "warn",	timestamp : new Date(), message: "*****3*****",	host:{ip: ip.address()}};
		logmsg4 = {level: "login",timestamp : new Date(), message: "*****4*****",	host:{ip: ip.address()}};
		logmsg5 = {level: "warn",	timestamp : new Date(), message: "*****5*****",	host:{ip: ip.address()}};
		logmsg6 = {level: "error",timestamp : new Date(), message: "*****6*****",	host:{ip: ip.address()}};
		logmsg7 = {level: "warn",	timestamp : new Date(), message: "*****7*****",	host:{ip: ip.address()}};
		logmsg8 = {level: "warn",	timestamp : new Date(), message: "*****8*****",	host:{ip: ip.address()}};
		logmsg9 = {level: "login",timestamp : new Date(), message: "*****9*****",	host:{ip: ip.address()}};
		
		
		collection.insert(logmsg0, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg1, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg2, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg3, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg4, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg5, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg6, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg7, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg8, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
		collection.insert(logmsg9, function(err, events){	if(err)	console.log('insert fail');	res.end();  });
    };
};

var level = ["warn","error","info","fatal","debug"];

exports.insert3 = function(mongodb){
	
	  return function(req, res) {
		var collection = mongodb.get('events');
	  	var logmsg = {
    		level: level[Math.floor(Math.random()*level.length)],
    		timestamp : new Date(),
    		message: Math.floor(Math.random()*5+1),
    		host:{ ip: ip.address()},
			osinfo:{
				tmpdir:	os.tmpdir(),
				endianness:	os.endianness(),
				hostname:	os.hostname(),
				type:	os.type(),
				plat:	os.platform(),
				arch:	os.arch(),
				rels:	os.release(),
				uptime:	os.uptime(),
				loadavg:	os.loadavg(),
				mem:	os.totalmem(),
				freemem:	os.freemem(),
				cpus:	os.cpus(),
				net: os.networkInterfaces()
			}
		};
		collection.insert(logmsg, function (err, events) {
			if (err) console.log('insert fail');
			console.log(logmsg);
			//console.log(util.inspect(os.cpus()));
			res.end();
		});
    };
};

exports.insert4 = function(mongodb){		
	return function(req, res) {
	
		var logmsg0 = {"level" : "WARN" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** warn  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		
		var logmsg1 = {"level" : "ERROR","host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** error *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg2 = {"level" : "INFO" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** info  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg3 = {"level" : "WARN" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** warn  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg4 = {"level" : "LOGIN","host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** login *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg5 = {"level" : "WARN" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** warn  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg6 = {"level" : "ERROR","host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** error *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg7 = {"level" : "WARN" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** warn  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg8 = {"level" : "WARN" ,"host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** warn  *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		var logmsg9 = {"level" : "LOGIN","host" : {"process" : "6516@server","name" : os.hostname(),"ip" : ip.address()},"message" : "***** login *****",
		"thread" : "508936546@qtp-1705442767-5","loggerName" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"},"fileName" : "HelloWorldController.java","method" : "showHello","lineNumber" : "23","class" : {"fullyQualifiedClassName" : "com.springsourcery.helloWorld.HelloWorldController","package" : ["com", "springsourcery", "helloWorld", "HelloWorldController"],"className" : "HelloWorldController"}};
		
		var logmsg = JSON.stringify(logmsg0)
			   +","+ JSON.stringify(logmsg1)
			   +","+ JSON.stringify(logmsg2)
			   +","+ JSON.stringify(logmsg3)
			   +","+ JSON.stringify(logmsg4)
			   +","+ JSON.stringify(logmsg5)
			   +","+ JSON.stringify(logmsg6)
			   +","+ JSON.stringify(logmsg7)
			   +","+ JSON.stringify(logmsg8)
			   +","+ JSON.stringify(logmsg9);
		
		var time = new Date;
		//var filename = "./events/e"+time.getTime()+".json";
		var filename = "/home/btserver/fluentd/data/"+time.getTime()+".json";
		
		fs.writeFile(filename, logmsg, function (err) {
			if(err) console.log("save fail");
			//console.log(time.toISOString());
			//console.log(JSON.stringify(logmsg0));
			//console.log(logmsg0);
			//console.log("save: " + __dirname + filename);
			res.end();
		});
		
		
    };
};

/*
var level = ["warn","error","info","fatal","debug"];
var host = ["host1","host2","host3"];
var ip = ["172.17.24.190","172.17.24.148","172.17.24.132"];
var message = ["1","2","3","4","5"];

for(var i =0;i<10000;i++){
var item = {
	'time':new Date(),
	'level':level[Math.floor(Math.random()*level.length)],
	'host':host[Math.floor(Math.random()*host.length)],
	'ip':ip[Math.floor(Math.random()*ip.length)],
	'message':Math.floor(Math.random()*5+1)
}
db.log.insert(item);
}
*/