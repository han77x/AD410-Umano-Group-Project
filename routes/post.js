var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req,res){
  
  var query = "INSERT INTO Properties (PropertyID, PropertyName, Adress, City, State, PostalCode, latitude, longitude, PropertyType, BuildingType, BuildingID, OperatingBankAccount, ReserveAmount, BuildingDescription, YearBuilt, RentalOwners)" + "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
  var queryParams = [
    req.body.PropertyID,
    req.body.PropertyName,
    req.body.Adress,
    req.body.city,
    req.body.State,
    req.body.PostalCode,
    req.body.latitude,
    req.body.longitude,
    req.body.PropertyType,
    req.body.BuildingType,
    req.body.BuildingID,
    req.body.OperatingBankAccount,
    req.body.ReserveAmount,
    req.body.BuildingDescription,
    req.body.YearBuilt,
    req.body.RentalOwners
  ];

  
	
  db.query(query, queryParams, (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
            res.redirect('/adminPage.html');

  });
  
});


module.exports = router;
