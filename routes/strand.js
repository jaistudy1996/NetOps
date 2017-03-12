var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '137.142.1.54',
	user: 'jay',
	password: 'jay',
	database: 'network'
});

router.get('/', function(req, res){
	res.render("Add strand");
});

router.get('/strandColor/', function(req, res){
	db.query("SELECT * FROM strand_color_fiber", function(error, resutls){
		if(error){
			console.log(error);
			res.send("SERVER ERROR");
		}
		res.send(results);
	});
});

module.exports = router;
