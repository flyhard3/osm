var geojsonFeature = [ {
	"type" : "Feature",
	"properties" : {
		"popupContent" : "あざみ野ガーデンズ"
	},
	"geometry" : {
		"type" : "Point",
		"coordinates" : [ 139.53692, 35.57294 ]
	}
}, {
	"type" : "Feature",
	"properties" : {
		"popupContent" : "すすき野の湯"
	},
	"geometry" : {
		"type" : "Point",
		"coordinates" : [ 139.52851, 35.57706 ]
	}
}, {
	"type" : "Feature",
	"properties" : {
		"popupContent" : "丸正"
	},
	"geometry" : {
		"type" : "Point",
		"coordinates" : [ 139.53467, 35.57817 ]
	}
} ];

var tilejson = {
	"tiles" : [ "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmx5aGFyZCIsImEiOiJjaWVtZGF1dXQwMDExc2trbTk4ZGhlMnRiIn0.ViVTsKyELz4am1AscNo4qA" ],
	"minzoom" : 0,
	"maxzoom" : 18
};