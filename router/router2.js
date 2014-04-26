/*
 =================================================
 chiguire-express
 Copyright (c) 2014 Luis Enrique Arriojas
 http://opensource.org/licenses/MIT
 =================================================
 */

module.exports = function (app, db) {
    app.get('/create-session-var', function (req, res) {
        req.session.name = "Luis";
        req.session.surname = "Arriojas";
        res.send(req.session.name + " " + req.session.surname);
    });

    app.get('/read-session-var', function (req, res) {
        res.send(req.session.name + " " + req.session.surname);
    });
};