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
    

    //req.body.c1
    //req.body.c2
    //req.body.c3
    //req.body.c4
    
    
    ];

    
for(var i =0; i<pref.length; i++){
        //var bdID =pref[i]
        console.log(pref[i]);
      
    





    }
 

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


