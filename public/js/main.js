// function myFunction() {
//     var x = document.getElementById("mySearch").placeholder;
//     document.getElementById("demo").innerHTML = x;
// }
/*Creates initial map view*/
function initMap() {
  var map = new google.maps.Map(document.getElementById('container'), {
    zoom: 12,
    center: {lat: 47.6987081, lng: -122.3325518}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('button_search').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}
/*Converts address to geolocation and centers map on it */
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('searchbar').value;
  geocoder.geocode({  'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(document).ready(function(){
	getBuildingType();
});

//get all messages from db
function getBuildingType() {
	$.getJSON("http://localhost:3000/api/v1/addresses/", (result)=>{
		// buildingTypeList =  result;
    var unique;
    var buildingList = [];
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
    buildingType(buildingList);
	});
}

function buildingType(bl) {
  var buildingTypeList = []
  for(i in bl) {
    buildingTypeList.push("<input type='checkbox' name=checkbox" + i + " value='check_box'>" + bl[i])
  }
  var text = "";
  for(b in buildingTypeList) {
    text += "<li>" + buildingTypeList[b] + "</li>";
    document.getElementById("building_type").innerHTML = text;
  }
}


// function buildingType() {
//   buildingTypeList = ["Single-Family", "Condo/Townhome", "Multi-Family", "Retail", "Office"];
//   document.getElementById("build_type").innerHTML = buildingTypeList;
// }
