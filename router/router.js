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
module.exports = function(app, db, passport) {
    //How to read GET and POST variables
    //GET -> req.query.name
    //POST -> req.body.name
    //----------------------------------------


    //routes for passport
    app.get('/login',
        passport.authenticate('facebook'));

    app.get('/loginCallback',
        passport.authenticate('facebook', {
            successRedirect: '/loginSuccess',
            failureRedirect: '/loginFailure'
        }));

    app.get('/loginSuccess', function(req, res) {
        //user's data is mount in req.session automatically.
        res.send("Facebook ID: " + req.session.passport.user.id);
    });

    app.get('/loginFailure', function(req, res) {
        //do whatever you want.
        res.send("facebook failure");
    });
    //----------------------------------------


    //routes just for testing
    app.get('/home', function(req, res) {
        res.redirect("/about");
    });

    app.get('/about', function(req, res) {
        res.json({
            name: "Luis",
            surname: "Arriojas"
        });
    });
    //----------------------------------------


    //test connection with mongoDB
    app.post('/createMongo', function(req, res) {
        var createMongo = require("./../scripts/createMongo")(req, res, db);
    });
    app.get('/listMongo', function(req, res) {
        var listMongo = require("./../scripts/listMongo")(req, res, db);
    });
    app.get('/readMongo', function(req, res) {
        var readMongo = require("./../scripts/readMongo")(req, res, db);
    });
    app.post('/updateMongo', function(req, res) {
        var updateMongo = require("./../scripts/updateMongo")(req, res, db);
    });
    app.get('/removeMongo', function(req, res) {
        var removeMongo = require("./../scripts/removeMongo")(req, res, db);
    });
    //----------------------------------------


    //test connection with redis
    app.get('/create-session', function(req, res) {
        req.session.name = "Luis";
        req.session.surname = "Arriojas";
        res.send(req.session.name + " " + req.session.surname);
    });
    app.get('/read-session', function(req, res) {
        res.send(req.session.name + " " + req.session.surname);
    });
    app.get('/update-session', function(req, res) {
        req.session.surname = "Catalini";
        res.send(req.session.name + " " + req.session.surname);
    });
    app.get('/delete-session', function(req, res) {
        delete req.session.surname;
        res.send(req.session.name + " " + req.session.surname);
    });
    app.get('/destroy-session', function(req, res) {
        req.session.destroy();
        //if try to read req.session.surname, will be an error. req.session will be re-generated with the next request.
        res.send('session destroy!!');
    });
    //----------------------------------------
};