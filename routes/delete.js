var express = require('express');
var router = express.Router();
var db = require('../db');

//Route to display messages

router.post('/', function(req,res){
    
  var queryParams =[req.body.PID]   
  var query = "DELETE FROM Properties WHERE PropertyID =?" ; 

  db.query(query, queryParams,(error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    res.status(201).send('record(s) deleted');
  });
  
});
module.exports = router;
