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

router.post('/addStrand', function(req, res, next){
	console.log(req.body);
	var tubes = req.body.tubeID;
	var strand = req.body.strandID;
	var colors = req.body.color;
	for(var i=0; i<tubes.length; i++){
		if(strand[i] == 'NOT SET' && colors[i] != 'NOT SET' && tubes[i] != 'NOT SET' && colors[i] != undefined){
			console.log("TRUE::: Tube: ", tubes[i], " Strand: ", strand[i], " Color: ", colors[i]);
			db.query('INSERT INTO strands_fiber (tube_id, strand_color) values(?, ?)', [tubes[i], colors[i]], function(error, results){
				if(error){
					console.log(error);
					res.send("SERVER ERROR");
				}
				return;
			});
		}
	}
	res.redirect('/strand');
});

router.post('/updateInfo', function(req, res, next){
	console.log(req.body);
	var tubes = req.body.tubeID;
	var strand = req.body.strandID;
	var colors = req.body.color;
	for(var i=0; i<tubes.length; i++){
		if(strand[i] != 'NOT SET' && colors[i] != 'NOT SET' && tubes[i] != 'NOT SET'){
			db.query('UPDATE strands_fiber set strand_color = ? where tube_id = ? and strand_id = ?', [colors[i], tubes[i], strand[i]], function(error, result){
				if(error){
					console.log(error);
					res.send('SERVER ERROR');
				}
				return;
			});
		}
	}
	res.redirect('/strand');
});

module.exports = router;
