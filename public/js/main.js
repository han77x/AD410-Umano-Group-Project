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
  var address = document.getElementById('address').value;
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
