var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req,res) {
    burger.all(function(data){
        var handbarObject = {burgers : data}
        console.log(handbarObject)
        res.render('index', handbarObject);
    });
});

router.post('/', function(req, res){
    burger.create([
        "burger_name", "devoured"
        ], [
        req.body.burger_name, false
        ], function(data) {
    res.redirect('/');
    });
});

// router.put('/burgers/:id', function(req,res) {
//     var condition = 'id = ' + req.params.id;
//     console.log('condition', condition);
//     burger.update({'devoured' : req.body.devoured}, condition, function(data){
//         res.redirect('/');
//     });
// });

router.put('/burgers/update/:id', function(req,res) {
    var condition = 'id = ' + req.params.id;
    console.log('condition', condition);
    burger.update({'devoured' : req.body.devoured}, condition, function(data){
        res.redirect('/');
    });
});

router.delete('/burgers/:id', function(req,res) {
    var condition = 'id = ' + req.params.id;
    burger.delete(condition, function(data){
        res.redirect('/');
    });
});

module.exports = router;