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
	res.render("Add strand");
});

router.get('/strandColor/', function(req, res, next){
	db.query("SELECT * FROM strand_color_fiber", function(error, results){
		if(error){
			console.log(error);
			res.send("SERVER ERROR");
		}
		res.send(results);
	});
});

router.get('/strandInfo/:tubeID', function(req, res, next){
	var tubeID = req.params.tubeID;
	console.log(tubeID);
	db.query("SELECT * FROM strands_fiber where tube_id = ?", [tubeID], function(error, results){
		if(error){
			console.log(error);
			res.send("SERVER ERROR");
		}
		console.log(tubeID, results);
		res.send(results);
		// res.send("STRAND INFO")
	});
});

router.post('/addStrand/', function(req, res, next){
	console.log(req.body);
	res.redirect('/strand');
});

module.exports = router;
