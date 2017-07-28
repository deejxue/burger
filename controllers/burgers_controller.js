var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/burgers', function(req,res) {
    burger.all(function(data){
        var handbarObject = {burgers : data}
        console.log(handbarObject)
        res.render('index', handbarObject);
    });
});

router.post('/burgers/create', function(req, res){
    burger.create(['burger_name'], [req.body.burger_name], function(data) {
    res.redirect('/burgers');

    });
});

router.put('/burgers/update/:id', function(req,res) {
    var condition = 'id = ' + req.params.id;
    console.log('condition', condition);
    burger.update({'devoured' : req.body.devoured}, condition, function(data){
        res.redirect('/burgers');
    });
});

router.delete('/burgers/delete/:id', function(req,res) {
    var condition = 'id = ' + req.params.id;
    burger.delete(condition, function(data){
        res.redirect('/burgers');
    });
});

module.exports = router;