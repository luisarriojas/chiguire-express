/*
 =================================================
 chiguire-express
 Copyright (c) 2014 Luis Enrique Arriojas
 http://opensource.org/licenses/MIT
 =================================================
 */

module.exports = function (req, res, db) {
    db.collection('mycollection').insert({
        name: "Luis"
    }, function (err, docs) {
        res.send("inserted!!");
    });
};