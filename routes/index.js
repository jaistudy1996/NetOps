var express = require('express');
var mysql = require("mysql");
var router = express.Router();

/* Connect to mysql database*/
var db = mysql.createConnection({
	host: '137.142.1.54',
	user: 'jay',
	password: 'jay',
	database: 'network'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Network Operations' });
});

router.get('/test', function(req, res){
	db.query("select * from location_fiber", function(err, results){
		if(err){
			console.log(err);
		}
		var data = results;
		console.log(data);
		res.end("<p>"+data[6].location_id+"</p>");
	});
});

module.exports = router;
