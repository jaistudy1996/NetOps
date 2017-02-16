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

// TODO: Improvise SQL by using joins to get cable data in one query
router.get('/getCables', function(req, res, next){
	// Replacement query: SELECT from_location, dest_location, FROM_DEST.building as from_dest_building, TO_DEST.building as to_dest_building FROM Cables_fiber inner join location_fiber as FROM_DEST on ( Cables_fiber.from_location=FROM_DEST.location_id) inner join location_fiber as TO_DEST on ( Cables_fiber.dest_location=TO_DEST.location_id);
	db.query("SELECT * FROM Cables_fiber", function(err, results){
		if(err){
			console.log(err);
		}
		console.log(results);
		// Query to get from location by id retrieved from Cables_fiber table.
		for(var i=0; i<results.length; i++){
			db.query("SELECT * from location_fiber where location_id = ?", [results[i].from_location], function(err, location_data){
					if(err){console.log(err);}
					console.log(location_data);
					console.log(i);
					console.log("After location_data: ", results);
			});
		}
		res.send(results);
	});
});

router.post('/addTube', function(req, res, next){
	// TODO: save this data in the database.
	console.log(req.body);
});

module.exports = router;
