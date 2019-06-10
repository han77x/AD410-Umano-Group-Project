
var buildingList2 = [];
$(document).ready(function(){
	getBuildingType();
});

function getBuildingType() {

	$.getJSON("http://localhost:3000/api/v1/addresses/", (result)=>{
    var unique;

    for (var i = 0; i < result.length; i++) {
      unique = true;
      console.log(result[i].PropertyID)
      for(var b in buildingList2){
        if(result[i].BuildingType == buildingList2[b]) {
          unique = false;
          break;
        }
      }
      if(unique == true) {
        //buildingList2.push( {result[i].BuildingType, result[i].PropertyI} );
        buildingList2.push(result[i].BuildingType);
      }
    }
    buildingTypeColor(buildingList2);
 
	});
}

function buildingTypeColor(bl) {
  //bldgTypeColorList =[];
  //initialColors=[];
  //console.log(initialColors[0])
$.getJSON("http://localhost:3000/api/v1/allColors", (result)=>{
   bldgTypeColorList =[];
   initialColors=[];
   for (var i = 0; i < result.length; i++) {
    initialColors[i]=result[i].Color;
    console.log(initialColors[0]); 
  }

  for(j in bl) {
  	//bldgTypeColorList.push("<input type='color' id=" +'color'+ bl[j] + " >" +bl[j])
    console.log(bl.indexOf(bl[j]));
    bldgTypeColorList.push("<input type='color' id=" +'color'+ bl[j]+ "  name="+'c'+ j+" value="+initialColors[j]+">" +bl[j])
  }

  var colorText="";
  for(bc in bldgTypeColorList) {
    colorText += "<li>" + bldgTypeColorList[bc] + "</li>";
    document.getElementById("building_typeColor").innerHTML = colorText;
  }
});
}
localStorage.setItem("buildingList2",buildingList2);

