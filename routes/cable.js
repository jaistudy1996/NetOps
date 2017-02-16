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

router.get('/getLocations', function(req, res, next){
	db.query("SELECT * from location_fiber", function(err, results){
		if(err){
			console.log(err);
		}
		res.send(results);
	});
});

router.get('/getCableType', function(req, res, next){
	db.query("SELECT * from CableType_fiber", function(err, results){
		if(err){
			console.log(err);
		}
		res.send(results);
	});
});

router.post('/addCable', function(req, res, next){
	// TODO: save this data in the database.
	console.log(req.body);
	db.query("INSERT into Cables_fiber (from_location, dest_location, num_of_tubes, enclosure_no, type, type2, type3)")
	res.send(req.body);
});

module.exports = router;
