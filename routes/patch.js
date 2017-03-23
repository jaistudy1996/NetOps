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
	res.render('patch');
})

router.post('/patchFiber', function(req, res, next){
	console.log(req.body);
	db.query('INSERT INTO patch_fiber (to_strand_id, from_strand_id, patch_cable, from_type, to_type) values (?, ?, ?, ?, ?)', [req.body.to_strand_id, req.body.from_strand_id, req.body.patch_cable, req.body.from_type, req.body.to_type], function(error, results){
		if(error){
			console.log(error);
			throw error;
		}
		if(results.insertId){
			console.log(results.insertId);
			// Db insert for from_type as switch
			if(req.body.from_type == 'Switch'){
				db.query('INSERT INTO patch_switch_fiber (patch_id, ip_address, port_no) values(?, ?, ?)', [results.insertId, req.body.from_ip_address, req.body.from_port_numnber], function(error, results){
					if(error){
						console.log(error);
						throw error;
					}
					return;
				});
			}
			if(req.body.to_type == 'Switch'){
				db.query('INSERT INTO patch_switch_fiber (patch_id, ip_address, port_no) values(?, ?, ?)', [results.insertId, req.body.to_ip_address, req.body.to_port_numnber], function(error, results){
					if(error){
						console.log(error);
						throw error;
					}
					return;
				});
			}
			if(req.body.from_type == 'FiberEnclosure'){
				db.query('INSERT INTO patch_FE_fiber (patch_id, enclosure_no, panel_no, port_no) values (?, ?, ?, ?)', [results.insertId, req.body.from_enclosure_number, req.body.from_panel_no, req.body.from_port_number], function(error, results){
					if(error){
						console.log(error);
						throw error;
					}
					return;
				});
			}
			if(req.body.to_type == 'FiberEnclosure'){
				db.query('INSERT INTO patch_FE_fiber (patch_id, enclosure_no, panel_no, port_no) values(?, ?, ?, ?)', [results.insertId, req.body.to_enclosure_number, req.body.to_panel_no, req.body.to_port_number], function(error, results){
					if(error){
						console.log(error);
						throw error;
					}
					return;
				});
			}
		}
		else{
			db.rollback(function(){
				console.log(error);
			});
		}
	});
	res.redirect('/patch');
});

module.exports = router;
