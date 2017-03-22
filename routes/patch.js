var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '137.142.1.54',
	user: 'jay',
	password: 'jay',
	database: 'network'
});

router.get('/', function(req, res, next){
	res.render('patch');
})

router.post('/patchFiber', function(req, res, next){
	console.log(req.body);
	res.redirect('/patch');
});

module.exports = router;
