var allLayers;
var v1950sLayer;
var v1960sLayer;
var v1970sLayer;
var v1980sLayer;
var v1990sLayer;
var v2000sLayer;
var v2010sLayer;

d3.json('/data', response => {
  // console.log(response);

  const allTornadoes = response
    .map( t => {return { lat: t.Start_Lat, lon: t.Start_Lon }});
  
  allLayers = L.heatLayer(allTornadoes, {
    radius: 15,
    blur: 25
  });
  allLayers.addTo(myMap);

  CurrentLayer = allLayers;

  const v1950s = response
    .filter( t => t.Year >= 1950 && t.Year < 1960)
    .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v1950sLayer = L.heatLayer(v1950s, {
    radius: 15,
    blur: 25
  });
  
  const v1960s = response
  .filter( t => t.Year >= 1960 && t.Year < 1970)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v1960sLayer = L.heatLayer(v1960s, {
    radius: 15,
    blur: 25
  });

  const v1970s = response
  .filter( t => t.Year >= 1970 && t.Year < 1980)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v1970sLayer = L.heatLayer(v1970s, {
    radius: 15,
    blur: 25
  });

  const v1980s = response
  .filter( t => t.Year >= 1980 && t.Year < 1990)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v1980sLayer = L.heatLayer(v1980s, {
    radius: 15,
    blur: 25
  });

  const v1990s = response
  .filter( t => t.Year >= 1990 && t.Year < 2000)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v1990sLayer = L.heatLayer(v1990s, {
    radius: 15,
    blur: 25
  });

  const v2000s = response
  .filter( t => t.Year >= 2000 && t.Year < 2010)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v2000sLayer = L.heatLayer(v2000s, {
    radius: 15,
    blur: 25
  })

  const v2010s = response
  .filter( t => t.Year >= 2010)
  .map( t => { return { lat: t.Start_Lat, lon: t.Start_Lon }});

  v2010sLayer = L.heatLayer(v2010s, {
    radius: 15,
    blur: 25
  })
});

var CurrentLayer;

function ChangeLayer(newLayer) {
  myMap.removeLayer(CurrentLayer);
  CurrentLayer = newLayer;
  CurrentLayer.addTo(myMap);
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