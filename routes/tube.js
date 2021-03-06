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
	db.query("SELECT Cables_fiber.*, FROM_DEST.building as from_building,FROM_DEST.closet as from_closet, TO_DEST.building as to_dest_building, TO_DEST.closet as to_closet FROM Cables_fiber inner join location_fiber as FROM_DEST on ( Cables_fiber.from_location=FROM_DEST.location_id) inner join location_fiber as TO_DEST on ( Cables_fiber.dest_location=TO_DEST.location_id)", function(err, results){
		if(err){
			console.log(err);
			//TODO: redirect to 505 error page.
		}
		res.send(results);
	});
});

router.get('/getStrandData/:cableID', function(req, res, next){
	var cableID = req.params.cableID;
	db.query("SELECT * FROM Tubes_fiber where cable_id = ?", [cableID], function(err, results){
		if(err){
			console.log(err);
			return;
		}
		res.send(results);
	});
});

router.post('/updateStrandData', function(req, res, next){
	var cableID = req.body.cable_name_id;
	for(item in req.body){
		if(item != "cable_name_id"){
			db.query("UPDATE Tubes_fiber SET num_of_strands = ? where cable_id = ? and tube_id = ?", [req.body[item], cableID, item], function(err, results){
				if(err){
					console.log(err);
				}
				console.log(results);
			});
		}
	}
	res.redirect("/strand");
});

router.post('/addTube', function(req, res, next){
	// TODO update it acc to new tube implementation.
	var cableID = req.body.cable_name_id;
	db.query("SELECT * from Cables_fiber where cable_id = ?", [cableID], function(err, results){
		if(err){
			console.log(err);
			return;
		}
		if(results[0].num_of_tubes == req.body.tubes_data.length){
			for(var i=0; i<req.body.tubes_data.length; i++){
				db.query("INSERT INTO Tubes_fiber (cable_id, num_of_strands) values (?, ?)", [cableID, req.body.tubes_data[i]], function(err, results){
					if(err){
						console.log(err);
						return;
					}
					return;
				});
			}
		}
		else{
			res.send("Wrong number of tubes received.");
		}
	});
	res.redirect("/strand");
});

module.exports = router;
