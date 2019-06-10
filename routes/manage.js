
var express = require('express');
var router = express.Router();
var db = require('../db');



router.post('/getProperties', function(req,res){
    var queryParams = [req.body.zipCode];
    var query = "SELECT * FROM Properties WHERE PostalCode = ?";

  db.query(query, queryParams,(error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
      var hTML = "<html><head><title>Manage Properties</title>	</head><h1 style= 'text-align: center; color:blue;margin-left:30px;'>Select a Property to edit</h1><form style='max-width: 1200px;width:80%;height:150px;background-color:gray;color:#000000;    font-weight: bold;font-size: 18pt;margin: 0 auto;align-items: center;align-content: center;position: relative;' id = 'editP' name = 'edit' method = 'post' action ='http://localhost:3000/api/v1/manage'>";
      var index = result.length;
      var i;
      for(i = 0; i < index; i++){
          var PK = result[i]["PropertyID"];

          var adress = result[i]["Adress"];
          var name = result[i]["PropertyName"];
          var city = result[i]["City"];
          var state = result[i]["State"];
          var type =  result[i]["PropertyType"];


          var newBox = "<input id = '" + PK + "' name = '" + PK + "' type = 'radio'>"    +name+'---' + adress + ', '+city+', ' + state + '---' +type+      "<br>";
          console.log(newBox);
          hTML = hTML + newBox;
      }

      hTML = hTML + "<br><input id = 'delSubmit' type = 'submit' value = 'Edit'></form></html>"
      res.send(hTML);
  });
    
});






router.post('/', function(req,res){
    
  var pList = req.body;
  var keyList = Object.keys(pList);
  var queryParams =[keyList[0]];
  var query = "SELECT * FROM Properties WHERE PropertyID = ?";
  
  db.query(query,queryParams, (error, result, fields) => {
    if (error){
      res.send(error);
    }
     var hTML2 = "<html><head><title>Manage Properties</title>	</head><h1 style= 'text-align: center; color:blue;margin-left:30px;'>Edit Property</h1><form style='max-width: 1200px;width:80%;height:350px;background-color:gray;color:#000000;    font-weight: bold;font-size: 18pt;margin: 0 auto;align-items: center;align-content: center;position: relative;' id = 'editP' name = 'edit' method = 'post' action ='http://localhost:3000/api/v1/manage/edit'>";
      var PK = result[0]["PropertyID"];
	  var adress = result[0]["Adress"];
	   var pname = result[0]["PropertyName"];
	   var city = result[0]["City"];
	  var state = result[0]["State"];
	  var pCode =result[0]["PostalCode"];
	  var ptype =  result[0]["PropertyType"];
   var btype =  result[0]["BuildingType"];

   if(result[0]["PreviousProperties"] =="YES"){
        var status = "checked='yes'"; 
    } else{
        var status="";
    }      
          var box1 = "Property Name: <input style='width:500px'type='text' name='box1' value='"+ pname +"'><br>"
          var box2 = "Address: <input style='width:500px' type='text' name='box2' value='"+ adress +"'><br>"
          var box3 = "City: <input style='width:500px' type='text' name = 'box3' value='"+ city +"'><br>"
          var box4 = "State: <input style='width:500px' type='text' name = 'box4' value='"+ state +"'><br>"
          var box5 = "PostalCode: <input style='width:500px'  type='text' name = 'box5' value='"+ pCode +"'><br>"
          var box6 = "Property Type: <input style='width:500px'  type='text' name = 'box6' value='"+ ptype +"'><br>"
          var box7 = "Building Type: <input style='width:500px' type='text' name = 'box7' value='"+ btype +"'><br>"
          var box8 = "Inactive property: <input style='width:80px; height:20px;'type='Checkbox' name = 'box8' "+status+" ><br><br>"

          var newBox = "save: <input id = '" + PK + "' name = '" + PK + "' type = 'Checkbox'  value='Save' checked><br>"

          console.log(box1);
    
          hTML2 = hTML2 + box1+box2+box3+box4+box5+box6+box7+box8+newBox;
          hTML2 = hTML2 + "<br><input id = 'delSubmit' style='width:200px; heigth:50px;' type = 'submit' value = 'Save'></form></html>"
          res.send(hTML2);
      });

      
  });



router.post('/edit', function(req,res){
    var pList = req.body;
    var keyList = Object.keys(pList);
    var queryParams = [req.body.box1,
                       req.body.box2,
                       req.body.box3,
                       req.body.box4,
                       req.body.box5,
                       req.body.box6,
                       req.body.box7,
                       req.body.box8,
                       keyList[0]
                       ];
        if(queryParams[7]== 'on'){
            queryParams[7]="YES";
        }               
    console.log(keyList[0]);
    console.log(req.body.box8);
  
    
    var query = `UPDATE Properties SET PropertyName = ?, Adress = ? , City =?, State =?, PostalCode=?, PropertyType=?, BuildingType=?, PreviousProperties =?
                 WHERE PropertyID = ? `;

  db.query(query, queryParams,(error, result, fields) => {
    if (error){
      res.status(500).send(error);
    }
      
              res.redirect('/adminPage.html');

  });
    
});

  module.exports = router;

 




