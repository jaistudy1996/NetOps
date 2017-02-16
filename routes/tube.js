var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('Add tube', {title: "Add tube data"});
});

router.post('/addTube', function(req, res, next){
	// TODO: save this data in the database.
	console.log(req.body);
});

module.exports = router;