var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req,res){

 var pref = [
    
 [req.body.c0,0,],
  [ req.body.c1,1],
   [req.body.c2,2],
   [req.body.c3,3],
   [req.body.c4,4]
    
    ];

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
    req.body.OperatingBankAccount,
    req.body.ReserveAmount,
    req.body.BuildingDescription,
    req.body.YearBuilt,
    req.body.RentalOwners
  ];
  var query = "INSERT INTO Properties (PropertyID, PropertyName, Address, City, State, PostalCode, latitude, longitude, PropertyType, BuildingType, OperatingBankAccount, ReserveAmount, BuildingDescription, YearBuilt, RentalOwners)" + "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"




    

 

  db.query(`UPDATE Building SET Color = ? WHERE buildingID = ? `, pref[0], (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
   db.query(`UPDATE Building SET Color = ? WHERE buildingID = ? `, pref[1], (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    db.query(`UPDATE Building SET Color = ? WHERE buildingID = ? `, pref[2], (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    db.query(`UPDATE Building SET Color = ? WHERE buildingID = ? `, pref[3], (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
    db.query(`UPDATE Building SET Color = ? WHERE buildingID = ? `, pref[4], (error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }


    res.redirect('/');
  });
 });
  });
  });
  });  
   
  });
 









module.exports = router;


