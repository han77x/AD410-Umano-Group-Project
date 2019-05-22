var buildingList = [];
var checkList = [];
var markers = [];

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

  displayMarkers(map);
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


function showMarker(result, resultsMap) {
  var location = {};
  location.lat = (Number(result.latitude));
  location.lng = (Number(result.longitude));
  console.log(location);
  resultsMap.setCenter(location);



  var infowindow = new google.maps.InfoWindow({
    content: result.PropertyName
  });

  var marker = new google.maps.Marker({
    map: resultsMap,
    position: location,
  });

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

function displayMarkers(resultsMap) {

  $.getJSON("http://localhost:3000/api/v1/addresses/", (result, status)=>{
    if(status === 'success') {
      for(var i in result) {
        showMarker(result[i], resultsMap);
      }
    } else {
      alert("The property didn't display for the following reason: " + status);
    }
  });
}

function markerMask (resultsMap) {
  displayProperties();
  deleteMarkers();
  $.getJSON("http://localhost:3000/api/v1/addresses/", (result, status)=>{
    if(status === 'success') {
      for(i in result) {
        for(c in checkList) {
          if(result[i].BuildingType == checkList[c].type){
            check = checkList[c].checked;
            break;
          }
        }
        console.log(check);
        if(check) {
          showMarker(result[i], resultsMap);
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
  // console.log(checkList);
  // console.log(checkList[2].type);
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
