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
	res.render('Add tube', {title: "Add tube data"});
});

router.get('/getCables', function(req, res, next){
	db.query("SELECT * FROM Cables_fiber", function(err, results){
		if(err){
			console.log(err);
		}
		res.send(results);
	});
});

router.post('/addTube', function(req, res, next){
	// TODO: save this data in the database.
	console.log(req.body);
});

module.exports = router;
