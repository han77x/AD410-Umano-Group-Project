var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  db.query('SELECT * FROM Admins WHERE Username = ?',[username], function (error, results, fields) {
    if (error) {
      res.json({
      status:false,
      message:'there are some error with query'
      })
    }else{
    if(results.length >0){
      if(password==results[0].AdminPassword){
        res.redirect('/adminPage.html');
      }else{
        res.redirect('/adminLogin.html');
      }
    }
    else{
      res.redirect('/adminLogin.html');
    }

    }

  });

});

module.exports = router;