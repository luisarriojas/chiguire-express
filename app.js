/*
chiguire-express
Copyright (c) 2014 Luis Enrique Arriojas
http://opensource.org/licenses/MIT

██╗     ██╗   ██╗██╗███████╗     █████╗ ██████╗ ██████╗ ██╗ ██████╗      ██╗ █████╗ ███████╗    
██║     ██║   ██║██║██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗     ██║██╔══██╗██╔════╝    
██║     ██║   ██║██║███████╗    ███████║██████╔╝██████╔╝██║██║   ██║     ██║███████║███████╗    
██║     ██║   ██║██║╚════██║    ██╔══██║██╔══██╗██╔══██╗██║██║   ██║██   ██║██╔══██║╚════██║    
███████╗╚██████╔╝██║███████║    ██║  ██║██║  ██║██║  ██║██║╚██████╔╝╚█████╔╝██║  ██║███████║    
╚══════╝ ╚═════╝ ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝  ╚════╝ ╚═╝  ╚═╝╚══════╝  

You're reading. I want to work for you.
https://www.linkedin.com/in/luisarriojas

*/
var environment = 'dev';
var setup = require('./setup.js')(environment);

//add mongodb
if (environment == 'production') {
    var mongoURL = "mongodb://" + setup.mongodb.user + ":" + setup.mongodb.password + "@" + setup.mongodb.host + ":" + setup.mongodb.port + "/" + setup.mongodb.database;
} else {
    var mongoURL = "mongodb://" + setup.mongodb.host + ":" + setup.mongodb.port + "/" + setup.mongodb.database;
};
var mongodb = require("mongodb").MongoClient;
mongodb.connect(mongoURL, {}, function(err, db) {
    if (err) throw err;

    //add passport
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    passport.use(new FacebookStrategy({
            clientID: setup.passport.clientID,
            clientSecret: setup.passport.clientSecret,
            callbackURL: setup.passport.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            });
        }
    ));

    //create express app
    var http = require('http');
    var express = require('express');
    var app = express();

    //add compression
    var compression = require('compression')();
    app.use(compression);

    //add cookie-parser
    var cookieParser = require('cookie-parser');
    app.use(cookieParser(setup.session.cookieParserSecret));

    //add express-session
    var expressSession = require('express-session');
    var connectRedis = require('connect-redis')(expressSession);
    app.use(expressSession({
        secret: setup.session.expressSessionSecret,
        store: new connectRedis({
            host: setup.redis.host,
            port: setup.redis.port,
            pass: setup.redis.pass,
            ttl: setup.redis.ttl
        })
    }));

    //body-parser
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    //static views
    app.use(express.static('./static'));

    //routing
    var router = require('./router/router')(app, db, passport);

    //404 error handler
    app.use(function(req, res) {
        res.status(404);
        res.sendfile('./static/404.html', function(err) {
            if (err) res.send('Error 404 - File not found !!');
        });
    });

    //Deploying server
    var port = process.env.PORT || 3000;
    http.createServer(app).listen(port, function() {
        console.log('Deployed at port ' + port + ' on ' + new Date());
    });
});