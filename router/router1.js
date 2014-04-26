/*
 =================================================
 chiguire-express
 Copyright (c) 2014 Luis Enrique Arriojas
 http://opensource.org/licenses/MIT
 =================================================
 */

module.exports = function (app, db) {
    app.get('/', function (req, res) {
        res.send("home");
    });

    app.get('/home', function (req, res) {
        res.redirect("/about");
    });

    app.get('/about', function (req, res) {
        res.json({"name": "luis"});
    });

    app.get('/insert', function (req, res) {
        var script1 = require("./../scripts/script1")(req, res, db);
    });
};