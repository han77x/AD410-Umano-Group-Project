var express = require('express');
var router = express.Router();
var db = require('../db');



router.get('/', function(req, res, next) {
	db.query("select * from Building", (error, result, fields) => {
		if (error) {
			res.status(500).send(error);
		}
		res.send(result);
	});
});

module.exports = router;