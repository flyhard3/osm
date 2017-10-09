/*
 * Modal
 */

	function modal_open(item) {
		console.log("modal_open", item);

		// What to do when modal window requested to open.
		$(this).blur(); // avoid chattering

		// Call for SPARQL and render result in modal
		dbpedia(item);

		if ($("#modal-overlay")[0])
			return false;

		// append dynamically add div for overlay
		$("body").append('<div id="modal-overlay"></div>');

		// fadein $("modal-overlay")
		$("#modal-overlay").fadeIn("normal");
		$("#modal-content").fadeIn("slow");
	};

	$("#modal-overlay,#modal-close").unbind().click(function() {
		// [#modal-overlay] or [#modal-close] processing on click (hmmm, not sure it's not effect for #modal-overlay.
		// Fade out [#modal-overlay],[#modal-close] on click
		$("#modal-content,#modal-overlay").fadeOut("normal", function() {
			// remove[#modal-overlay] from html dom after fadeout.
			$("#modal-overlay").remove();
		});
	});

/* Modal Code End */

var geojson = null;

L.mapbox.accessToken = 'pk.eyJ1IjoiZmx5aGFyZCIsImEiOiJjaWVtZGF1dXQwMDExc2trbTk4ZGhlMnRiIn0.ViVTsKyELz4am1AscNo4qA';

var map = L.mapbox.map('map', 'mapbox.streets', {
	scrollWheelZoom : true
}).setView([ 38.2490167,140.3270053], 13);
var layers = {
	Streets : L.mapbox.tileLayer('mapbox.streets'),
	Outdoors : L.mapbox.tileLayer('mapbox.outdoors'),
	Satellite : L.mapbox.tileLayer('mapbox.satellite'),
	Markers : L.mapbox.tileLayer('mapbox.dc-markers')
};

layers.Streets.addTo(map);
L.control.layers(layers).addTo(map);

var popup = L.popup();

//function onMapClick(e) {
//	popup.setLatLng(e.latlng).setContent(
//			"You clicked the map at " + e.latlng.toString()).openOn(map);
//}
//
//map.on('click', onMapClick);

function set_marker(amenity) {
	if (geojson != null) {
		clearLayer();
	}

	var geoJsonFile = "./js/" + amenity + ".js";

	$
			.getJSON(
					geoJsonFile,
					function(data) {
						geojson = L
								.geoJson(
										data,
										{
											onEachFeature : function(feature,
													layer) {
												layer
														.bindPopup("<a href=\"#\" onclick=\"modal_open(this.firstChild);\">"
																+ feature.properties.name
																+ "</a>");
											}
										});
						geojson.addTo(map);
					});
}

function clearLayer() {
	map.removeLayer(geojson);
}

function dbpedia_test(item) {
	var item_r = item.nodeValue.replace(/ /g, "_");
	console.log("item: ", item_r);
}




