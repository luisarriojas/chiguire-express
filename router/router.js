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
    //routes for passport
    app.get('/login',
        passport.authenticate('facebook'));
    
    app.get('/loginCallback',
        passport.authenticate('facebook', {
            successRedirect: '/loginSuccess',
            failureRedirect: '/loginFailure'
        }));
    
    app.get('/loginSuccess', function(req, res) {
        //check if the user exists in DB and create a custom session if the project requires.
        res.send("Facebook ID: " + req.session.passport.user.id);
    });
    
    app.get('/loginFailure', function(req, res) {
        //do whatever you want.
        res.send("facebook failure");
    });
    
    
    
    
    //routes just for test
    app.get('/home', function (req, res) {
        res.redirect("/about");
    });

    app.get('/about', function (req, res) {
        res.json({"name": "luis"});
    });

    app.get('/insert', function (req, res) {
        var script1 = require("./../scripts/script1")(req, res, db);
    });
    
    
    
    
    //routes to check if session is working
    app.get('/create-session-var', function(req, res) {
        req.session.name = "Luis";
        req.session.surname = "Arriojas";
        res.send(req.session.name + " " + req.session.surname);
    });

    app.get('/read-session-var', function(req, res) {
        res.send(req.session.name + " " + req.session.surname);
    });
};