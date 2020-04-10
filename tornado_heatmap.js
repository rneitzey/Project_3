var allLayers;
var allTornadoes;

d3.json('/data', response => {
  // console.log(response);

  allTornadoes = response
    .map(t => { return { lat: t.Start_Lat, lon: t.Start_Lon, year: t.Year } });

  allLayers = L.heatLayer(allTornadoes, {
    radius: 15,
    blur: 25
  });
  allLayers.addTo(myMap);

  CurrentLayer = allLayers;
});

var CurrentLayer;

function ChangeLayer(newLayer) {
  myMap.removeLayer(CurrentLayer);
  CurrentLayer = newLayer;
  CurrentLayer.addTo(myMap);
};

function TornadoesAll() {
  var newLayer = L.heatLayer(allTornadoes, {
    radius: 15,
    blur: 25
  });
  ChangeLayer(newLayer);
};

function DecadeFilter(input) {
  var tempData = allTornadoes.filter(t => t.year >= input && t.year < (input + 10));
  // .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});
  var newLayer = L.heatLayer(tempData, {
    radius: 18,
    blur: 25
  });
  ChangeLayer(newLayer);
};

function YearFilter(input) {
  var tempData = allTornadoes.filter(t => t.year == input);
  var newLayer = L.heatLayer(tempData, {
    radius: 30,
    blur: 25
  });
  ChangeLayer(newLayer);
};

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.satellite",
  accessToken: API_KEY
});


var baseMaps = {
  "Street Map": streetmap,
  "Satellite Map": satellitemap
};

var overlayMaps = {};

var myMap = L.map("map", {
  center: [38.563891, -94.878246],
  zoom: 5,
  layers: [streetmap,]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);