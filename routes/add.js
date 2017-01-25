var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Connect to database */
var db = mysql.createConnection({
	host: '137.142.1.54',
	user: 'jay',
	password: 'jay',
	database: 'network'
});

router.get('/', function(req, res, next){
	res.render('Add data', {title: "Add data"});
});

module.exports = router;