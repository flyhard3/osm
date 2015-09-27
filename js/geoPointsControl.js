var geojson=null;

L.mapbox.accessToken = 'pk.eyJ1IjoiZmx5aGFyZCIsImEiOiJjaWVtZGF1dXQwMDExc2trbTk4ZGhlMnRiIn0.ViVTsKyELz4am1AscNo4qA';

var map = L.mapbox.map('map', 'mapbox.streets',
		{
    scrollWheelZoom: true
}).setView([ 40.77976, -73.96614 ], 13);
var layers = {
	Streets : L.mapbox.tileLayer('mapbox.streets'),
	Outdoors : L.mapbox.tileLayer('mapbox.outdoors'),
	Satellite : L.mapbox.tileLayer('mapbox.satellite'),
	Markers: L.mapbox.tileLayer('mapbox.dc-markers')
};

layers.Streets.addTo(map);
L.control.layers(layers).addTo(map);

	var popup = L.popup();

function onMapClick(e) {
	popup.setLatLng(e.latlng).setContent(
			"You clicked the map at " + e.latlng.toString())
			.openOn(map);
}

map.on('click', onMapClick);

function set_marker(amenity){
	if (geojson!=null){clearLayer();}
	
	var geoJsonFile = "./js/"+amenity+".js";
	
	$.getJSON(geoJsonFile, function(data) {
	     geojson = L.geoJson(data, {
	        onEachFeature: function (feature, layer) {
	            layer.bindPopup(feature.properties.name);
	        }
	    });
	    geojson.addTo(map);
	});
}


function clearLayer(){
    map.removeLayer(geojson);
}


