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

router.post('/addTube', function(req, res, next){
	// TODO: save this data in the database.
	console.log(req.body);
});

module.exports = router;
