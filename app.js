/*
 =================================================
 chiguire-express
 Copyright (c) 2014 Luis Enrique Arriojas
 http://opensource.org/licenses/MIT
 =================================================
 */

//add mongodb
var mongodb = require("mongodb").MongoClient;
mongodb.connect("mongodb://localhost:27017/mydatabase", {}, function (err, db) {
    if (err) throw err;

    //create express app
    var http = require('http');
    var express = require('express');
    var app = express();

    //add compression
    var compression = require('compression')();
    app.use(compression);

    //add cookie-parser
    var cookieParser = require('cookie-parser');
    app.use(cookieParser("password"));

    //add express-session
    var expressSession = require('express-session');
    var connectRedis = require('connect-redis')(expressSession);
    app.use(expressSession({
        secret: "another password",
        store: new connectRedis({
            host: '127.0.0.1',
            port: 6379,
            ttl: 60
        })
    }));

    //static views
    app.use(express.static('./static'));

    //routing
    var router1 = require('./router/router1')(app, db);
    var router2 = require('./router/router2')(app, db);

    //404 error handler
    app.use(function (req, res) {
        res.status(404);
        res.sendfile('./static/404.html', function (err) {
            if (err) res.send('Error 404 - File not found !!');
        });
    });

    //Deploying server
    var port = process.env.NODE_PORT || 3000;
    http.createServer(app).listen(port, function () {
        console.log('Deployed at port ' + port);
    });
});