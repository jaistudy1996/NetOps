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
	db.query('INSERT INTO patch_fiber (to_strand_id, from_strand_id, patch_cable, from_type, to_type, from_strand_id_2, to_strand_id_2) values (?, ?, ?, ?, ?, ?, ?)', [req.body.to_strand_id, req.body.from_strand_id, req.body.patch_cable, req.body.from_type, req.body.to_type, req.body.from_strand_id_2, req.body.to_strand_id_2], function(error, results){
		if(error){
			db.rollback(function(){
			});
			console.log(error);
			//throw error;
		}
		if(results){
			console.log(results.insertId);
			// Db insert for from_type as switch
			if(req.body.from_type == 'Switch'){
				db.query('INSERT INTO patch_switch_fiber (patch_id, ip_address, port_no) values(?, ?, ?)', [results.insertId, req.body.from_ip_address, req.body.from_port_numnber], function(error, results){
					if(error){
						db.rollback(function(){
							console.log(error);
						});
					}
					return;
				});
			}
			if(req.body.to_type == 'Switch'){
				db.query('INSERT INTO patch_switch_fiber (patch_id, ip_address, port_no) values(?, ?, ?)', [results.insertId, req.body.to_ip_address, req.body.to_port_numnber], function(error, results){
					if(error){
						db.rollback(function(){
							console.log(error);
						});
					}
					return;
				});
			}
			if(req.body.from_type == 'FiberEnclosure'){
				db.query('INSERT INTO patch_FE_fiber (patch_id, enclosure_no, panel_no, port_no, location_id, loc_type) values (?, ?, ?, ?, ?, ?)', [results.insertId, req.body.from_enclosure_number, req.body.from_panel_no, req.body.from_port_number, req.body.from_enclosure_location_number, "from"], function(error, results){
					if(error){
						db.rollback(function(){
							console.log(error);
						});
					}
					return;
				});
			}
			if(req.body.to_type == 'FiberEnclosure'){
				db.query('INSERT INTO patch_FE_fiber (patch_id, enclosure_no, panel_no, port_no, location_id, loc_type) values(?, ?, ?, ?, ?, ?)', [results.insertId, req.body.to_enclosure_number, req.body.to_panel_no, req.body.to_port_number, req.body.to_enclosure_location_number, "to"], function(error, results){
					if(error){
						db.rollback(function(){
							console.log(error);
						});
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

router.get('/search', function(req, res, next){
	res.render('search');
});

router.post('/searchParams', function(req, res, next){
	console.log(req.body);
	db.query('select * from Cables_fiber as cable inner join Tubes_fiber as tube on (cable.cable_id = tube.cable_id) inner join strands_fiber as strand on (tube.tube_id = strand.tube_id) inner join patch_fiber as patch on (patch.from_strand_id = strand.strand_id) where cable.from_location = ?', [req.body.from_loc], function(error, results){
		if(error){
			console.log(error);
		}
		res.send(results);
	});
	//res.redirect('/patch/search');
})

module.exports = router;
