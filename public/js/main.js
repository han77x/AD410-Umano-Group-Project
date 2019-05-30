
var pincolors =[];
loadPinColors();

console.log(pincolors)
var buildingList = [];
var checkList = [];
var markers = [];
//var buildingList2=localStorage.getItem("buildingList2");

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

  document.getElementById('marker_button').addEventListener('click', function() {
    markerMask(map);
  });
    
    //trafic conditions
    var trafficLayer = new google.maps.TrafficLayer();
 trafficLayer.setMap(map);


  displayMarkers(map);

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
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
      markers.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}





function showMarker(result, resultsMap,pinColor) {

  var location = {};
  location.lat = (Number(result.latitude));
  location.lng = (Number(result.longitude));
  console.log(location);
  resultsMap.setCenter(location);
    
    //hanbos code
    var infowindow = new google.maps.InfoWindow({
    content: '<p><b>Property Name</b>: '+ result.PropertyName + "<br />" +  '<p><b>Address</b>: ' + result.Adress + "<br />" + '<p><b>Property Type</b>: ' + result.PropertyType + "<br />" + '<p><b>Property ID</b>: ' + result.PropertyI
  });
    
    //end hanbos code

  var marker = new google.maps.Marker({
    map: resultsMap,
    position: location,
    icon: pinSymbol(pinColor)
    //icon: {

      //url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"

    //}
  });

  //Keep track of markers 
  marker.addListener('mouseover', function() {
    infowindow.open(resultsMap, marker);
  });

  marker.addListener('mouseout', function() {
    infowindow.close(resultsMap, marker);
  });

  //Keep track of markers
  markers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}

// Displays all property markers on page load
function displayMarkers(resultsMap) {
  
	$.getJSON("http://localhost:3000/api/v1/addresses/", (result, status)=>{
    if(status === 'success') {
      
      for(var i in result) {
        
        //var pinColor = document.getElementById(buildingList2[i]).value;
        //console.log(pinColor)
        
        pinColor = pincolors[result[i].BuildingID]

         //$.getJSON("http://localhost:3000/api/v1/allcolors", (result)=>{
              
    		showMarker(result[i], resultsMap, pinColor);
      //});
      }

    } else {
      alert("The property didn't display for the following reason: " + status);
    }
  
	});
}

// Displays markers only for building types that are checked
function markerMask (resultsMap) {
  displayProperties();
  deleteMarkers();
  $.getJSON("http://localhost:3000/api/v1/addresses/", (result, status)=>{
    if(status === 'success') {
      //var pinColor;
      for(i in result) {
        
       var pinColor =pincolors[result[i].BuildingID];
       //var pinColor = document.getElementById(buildingList2[i]).value;
        

        for(c in checkList) {
          if(result[i].BuildingType == checkList[c].type){
            check = checkList[c].checked;
            break;
          }
        }
        console.log(check);
        if(check) {
          
        showMarker(result[i], resultsMap, pinColor);
            
            console.log(pinColor)
            //showMarker(result[i], resultsMap, pinColor);
        }
      }
    } else {
      alert("Properties didn't display for the following reason: " + status);
    }
	});
}

// Runs the following functions after the document loads
$(document).ready(function(){
	getBuildingType();
});

function displayProperties() {
  var checkBox;
  checkList = [];
  for(b in buildingList) {
    checkBox = document.getElementById(buildingList[b]);
    var building = {
    };
    building.checked = checkBox.checked;
    building.type = buildingList[b];

    checkList.push(building);
  }
  
 }

//get all messages from db
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
    buildingType(buildingList);
    // return buildingList;
	});
}

function buildingType(bl) {
  
  var buildingTypeList = []
  for(i in bl) {
    buildingTypeList.push("<input type='checkbox' id=" + bl[i] + " value='check_box'>" + bl[i])
  }

  var text = "";
  
  for(b in buildingTypeList) {
   text += "<li>" + buildingTypeList[b] + "</li>";
    document.getElementById("building_type").innerHTML = text;
  }

}

function loadPinColors(){
  $.getJSON("http://localhost:3000/api/v1/allColors", (res)=>{
     for(i in res){
      pincolors.push(res[i].Color);
     }
  });
}




  



