var express = require('express');
var router = express.Router();
var db = require('../db');
//var app = require('express')();

//if /all is called, return the full results of the db.query. to select what kind of info to return, limit the query.


router.get('/', function(req, res, next) {
	db.query("select * from properties", (error, result, fields) => {
		if (error) {
			res.status(500).send(error);
		}
		res.send(result);
	});
});
module.exports = router;