var buildingList = [];
$(document).ready(function(){
	getBuildingType();
});

function getBuildingType() {
	$.getJSON("http://localhost:3000/api/v1/addresses/", (result)=>{

    var unique;

    for (var i = 0; i < result.length; i++) {
      unique = true;
      for(var b in buildingList){
        if(result[i].BuildingType == buildingList[b]) {
          unique = false;
          break;
        }
      }
      if(unique == true) {
        buildingList.push(result[i].BuildingType);
      }
    }
    buildingTypeColor(buildingList);
 
	});
}

function buildingTypeColor(bl) {

var bldgTypeColorList =[]
  for(j in bl) {
    bldgTypeColorList.push("<input type='color' id=" +'color'+ bl[j] + " >" +bl[j])
  }

  var colorText="";
  for(bc in bldgTypeColorList) {
    colorText += "<li>" + bldgTypeColorList[bc] + "</li>";
    document.getElementById("building_typeColor").innerHTML = colorText;

  }
}