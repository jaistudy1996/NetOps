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
	var from_location = req.body.from_loc;
	var dest_location = req.body.to_loc;
	var type = req.body.cable_type_1;
	var type2 = req.body.cable_type_2;
	if(!type2){type2 = null;}
	var type3 = req.body.cable_type_3;
	if(!type3){type3 = null;}
	var fromEnclosure_no = req.body.from_encl_no;
	var toEnclosure_no = req.body.to_encl_no;
	var num_of_tubes = req.body.no_of_tubes;
	db.query("INSERT into Cables_fiber (from_location, dest_location, num_of_tubes, from_enclosure_no, to_enclosure_no, type, type2, type3) values(?, ?, ?, ?, ?, ?, ?, ?)", [from_location, dest_location, num_of_tubes, fromEnclosure_no, toEnclosure_no, type, type2, type3], function(err, result){
			if(err){
				console.log(err);
			}
			console.log(result);
	});
	res.redirect("/tube");
});

module.exports = router;
