// $Date: 2015-06-07 14:40:13 +0900 (日, 07 6 2015) $
// $Rev: 946 $
// Author: Hidekazu Shirayama

var result = 0;

function dbpedia(item) {
	
	dbpedia_hostname = "ja.dbpedia.org";

	$("#abstract").empty();
	$("#homepage").empty();
	
	// Replace space with underscore.
	var item_r = item.nodeValue.replace(/ /g,"_");
	
	// Replace all first char to upper case.
	item_r = item_r.replace(/^[a-z]/g,function(val){
		return val.toUpperCase();
		
	});
	item_r = item_r.replace(/_[a-z]/g,function(val){
		return val.toUpperCase();
		
	});

	console.log("item_r", item_r);
	
	// Check for resource's abstract in @en

	if (item_r != "") {
		var ask = "ask where { <http://"
				+ dbpedia_hostname
				+ "/resource/"
				+ item_r
				+ "> <http://dbpedia.org/ontology/abstract> ?abstract .}";

		// select * where { <http://dbpedia.org/resource/Yokohama>
		// <http://dbpedia.org/ontology/abstract> ?abstract . FILTER
		// (langMatches(lang(?abstract), "fr"))}

		// check for abstract exists or not.
		$.ajax({
			type : "POST",
			url : "http://" + dbpedia_hostname + "/sparql",
			data : {
				"default-graph-uri" : "http://" + dbpedia_hostname,
				"query" : ask
			},
			//async : false, // Need this to show this first.
			dataType : "json",
			success : function(res) {
				// 
				if (res.boolean == true) {
					result= 1;
					;;;console.log("FOUND: " + item_r);
					dbpedia_get_abstract(item_r);
				} else {
					;;;console.log("NOT FOUND:" + item_r);
					$("#abstract").append(
							"<p class='abstract-text'>No abstract was found in dbpedia.</p>");
				}
			},
			error : function(res) {
				;;;console.log("fail:" + res);
			}
		});
	}


		var sparql = "select distinct * where { <http://" + dbpedia_hostname
				+ "/resource/" + item_r
				+ "> <http://xmlns.com/foaf/0.1/isPrimaryTopicOf> ?url .}";

		$.ajax({
			type : "POST",
			url : "http://" + dbpedia_hostname + "/sparql",
			data : {
				"default-graph-uri" : "http://" + dbpedia_hostname,
				"query" : sparql
			},
			dataType : "json",
			success : function(res) {
				result = 1;
				$("#abstract").append(
						"<p><b>Wikipedia</b><br/><a href=\""
								+ res.results.bindings[0].url.value + "\">"
								+ res.results.bindings[0].url.value + "</p>");
			},
			error : function(res) {
				;;;console.log("Wiki fail:" + res);
			}
		});


	// homepage, image

		var ask = "ask where { <http://"
				+ dbpedia_hostname
				+ "/resource/"
				+ item_r
				+ ">  <http://xmlns.com/foaf/0.1/homepage> ?homepage; <http://dbpedia.org/ontology/thumbnail> ?image .}";

		// check for abstract exists or not.
		$.ajax({
			type : "POST",
			url : "http://" + dbpedia_hostname + "/sparql",
			data : {
				"default-graph-uri" : "http://" + dbpedia_hostname,
				"query" : ask
			},
			dataType : "json",
			success : function(res) {
				// 
				if (res.boolean == true) {
					;;;console.log("FOUND: " + item_r);
					result=1;
					dbpedia_get_homepage(item_r);
				} else {
					;;;console.log("Homepage or Image NOT FOUND:" + item_r);
					$("#homepage").append(
					"<p class='abstract-text'>No homepage info or image was found in dbpedia.</p>");
				}
			},
			error : function(res) {
				;;;console.log("fail:" + res);
			}
		});

}

function dbpedia_get_abstract(item) {

	// Show Abstract 
	var sparql = "select distinct * where { <http://"
			+ dbpedia_hostname
			+ "/resource/"
			+ item
			+ "> <http://dbpedia.org/ontology/abstract> ?abstract . FILTER (langMatches(lang(?abstract), \""
			+ "en" + "\"))}";

	$.ajax({
		type : "POST",
		url : "http://" + dbpedia_hostname + "/sparql",
		data : {
			"default-graph-uri" : "http://" + dbpedia_hostname,
			"query" : sparql
		},
		dataType : "json",
		success : function(res) {
				$("#abstract").append(
						"<b>Description</b><br/><p class='abstract-text'>"
								+ res.results.bindings[0].abstract.value + "</p>");
		},
		error : function(res) {
			;;;console.log("fail:" + res);
		}
	});

}



function dbpedia_get_homepage(addr0) {
	
	var sparql = "select distinct * where { <http://"
			+ dbpedia_hostname
			+ "/resource/"
			+ addr0
			+ "> <http://xmlns.com/foaf/0.1/homepage> ?homepage; <http://dbpedia.org/ontology/thumbnail> ?image . }";
	$.ajax({
		type : "POST",
		url : "http://" + dbpedia_hostname + "/sparql",
		data : {
			"default-graph-uri" : "http://" + dbpedia_hostname,
			"query" : sparql
		},
		dataType : "json",
		success : function(res) {
			
			console.log("res:", res);
			result = 1;
				$("#homepage").append(
						"<p><b>Homepage</b><br/><a class='homepage-link' href=\""
								+ res.results.bindings[0].homepage.value + "\">"
								+ res.results.bindings[0].homepage.value + "</a></p>");
				$("#homepage").append(
						"<div><img src=\"" + res.results.bindings[0].image.value
								+ "\"/></div><br />");				
		},
		error : function(res) {
			;;;console.log("fail:" + res);
		}
	});
}
