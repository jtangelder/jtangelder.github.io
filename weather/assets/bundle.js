(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["c"] = reduce;
/* harmony export (immutable) */ exports["b"] = map;
/* harmony export (immutable) */ exports["a"] = round;
function reduce(fn, initialValue, arrayLike) {
  let value = initialValue;
  for(let i = 0; i < arrayLike.length; i++) {
    value = fn(value, arrayLike[i], i);
  }
  return value;
}

function map(fn, arrayLike) {
  return reduce((acc, value, index) => {
    acc.push(fn(value, index));
    return acc;
  }, [], arrayLike);
}

function round(nr, decimals) {
  const m = Math.pow(10, decimals);
  return Math.round(nr * m) / m;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__xmlUtils__ = __webpack_require__(5);
/* harmony export (immutable) */ exports["a"] = fetchWeatherData;
/* harmony export (immutable) */ exports["b"] = getStations;
/* harmony export (immutable) */ exports["c"] = stationHasTemperature;
/* harmony export (immutable) */ exports["d"] = getStationLatLng;




function fetchWeatherData() {
  return window.fetch(__WEBPACK_IMPORTED_MODULE_0__constants__["d" /* API_URL */])
    .then(response => response.text())
    .then(__WEBPACK_IMPORTED_MODULE_2__xmlUtils__["a" /* parseXMLString */])
}

function getStations(xmlTree) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* map */])(__WEBPACK_IMPORTED_MODULE_2__xmlUtils__["b" /* nodeToJSON */], xmlTree.querySelectorAll('actueel_weer > weerstations > weerstation'));
}

function stationHasTemperature(station) {
  return station.temperatuurGC !== '-';
}

function getStationLatLng(station) {
  return { lat: station.latGraden, lng: station.lonGraden };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
const API_URL = 'http://xml.buienradar.nl/';
/* harmony export (immutable) */ exports["d"] = API_URL;


const MAP_BACKGROUND = '#483D8B';
/* harmony export (immutable) */ exports["b"] = MAP_BACKGROUND;


const MAP_CENTER = { lat: 52.1537906, lng: 5.3175972 };
/* harmony export (immutable) */ exports["a"] = MAP_CENTER;


const MAP_STYLES = [
  {elementType: 'geometry', stylers: [{color: '#7a58d9'}]},
  {elementType: 'labels', stylers: [{visibility: 'off'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: MAP_BACKGROUND }]},
  {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#8b64f8'}]},
];
/* harmony export (immutable) */ exports["c"] = MAP_STYLES;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StationMarker__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(1);



function removeMarker(marker) {
  marker.setMap(null);
}

function addStationMarker(map, data) {
  return new __WEBPACK_IMPORTED_MODULE_0__StationMarker__["a" /* StationMarker */](map, { lat: data.latGraden, lng: data.lonGraden }, data);
}

function createAverageStation(baseStation, stations) {
  const averageStation = stations.reduce((average, station) =>
    Object.assign(average, {
      temperatuurGC: average.temperatuurGC + station.temperatuurGC,
      lat: average.lat + station.lat,
      lng: average.lng + station.lng,
      latGraden: average.latGraden + station.latGraden,
      lngGraden: average.lngGraden + station.lngGraden
    })
  , baseStation);

  const t = (stations.length + 1);
  return Object.assign(averageStation, {
    temperatuurGC: averageStation.temperatuurGC / t,
    lat: averageStation.lat / t,
    lng: averageStation.lng / t,
    latGraden: averageStation.latGraden / t,
    lngGraden: averageStation.lngGraden / t,
  });
}

function isIntersectingStation(intersectLatLng, baseStation, compareStation) {
  const baseLatLng = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api__["d" /* getStationLatLng */])(baseStation);
  const compareLatLng = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api__["d" /* getStationLatLng */])(compareStation);
  if (baseStation === compareStation) {
    return false;
  }
  return (
    Math.abs(baseLatLng.lat - compareLatLng.lat) < intersectLatLng.lat &&
    Math.abs(baseLatLng.lng - compareLatLng.lng) < intersectLatLng.lng
  );
}

class StationMarkerCluster extends google.maps.OverlayView {
  constructor(map, stations) {
    super();
    this.stations = stations;
    this.markers = [];
    this.setMap(map);
  }

  onRemove() {
    this.markers.forEach(removeMarker);
  }

  getIntersectLatLng() {
    // find out how what the distance between a the marker size is to find out intersections
    const pixelA = new google.maps.Point(0, 0);
    const pixelB = new google.maps.Point(__WEBPACK_IMPORTED_MODULE_0__StationMarker__["b" /* MARKER_WIDTH */], __WEBPACK_IMPORTED_MODULE_0__StationMarker__["c" /* MARKER_HEIGHT */]);
    const posA = this.getProjection().fromDivPixelToLatLng(pixelA);
    const posB = this.getProjection().fromDivPixelToLatLng(pixelB);

    return {
      lat: posB.lng() - posA.lng(),
      lng: posB.lng() - posA.lng()
    };
  }

  draw() {
    const intersectLatLng = this.getIntersectLatLng();
    const drawStations = [];
    let stationsStack = [...this.stations];
    let curStation;

    while(curStation = stationsStack.shift()) {
      const intersections = stationsStack.filter(compareStation =>
        isIntersectingStation(intersectLatLng, curStation, compareStation)
      );

      intersections.forEach(intersectStation => {
        const index = stationsStack.indexOf(intersectStation);
        if (index > -1) {
          stationsStack.splice(index, 1);
        }
      });

      drawStations.push(
        intersections.length ?
          createAverageStation(curStation, intersections) :
          curStation
      );
    }

    const addMarker = addStationMarker.bind(null, this.getMap());
    this.markers.forEach(removeMarker);
    this.markers = drawStations.map(addMarker);
  }
}
/* harmony export (immutable) */ exports["a"] = StationMarkerCluster;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const MARKER_WIDTH = 50;
/* harmony export (immutable) */ exports["b"] = MARKER_WIDTH;

const MARKER_HEIGHT = 50;
/* harmony export (immutable) */ exports["c"] = MARKER_HEIGHT;


class StationMarker extends google.maps.OverlayView {
  constructor(map, position, station) {
    super();

    this.position = new google.maps.LatLng(position.lat, position.lng);
    this.data = station;

    this.setMap(map);
  }

  onAdd() {
    const data = this.data;
    const element = document.createElement('div');
    this.element = element;

    Object.assign(element.style, {
      width: `${MARKER_WIDTH}px`,
      height: `${MARKER_HEIGHT}px`,
      backgroundImage: `url(${data.icoonactueel.value})`
    });

    element.className = 'stationMarker';
    element.textContent = `${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* round */])(data.temperatuurGC, 1)}`;
    element.title = `${data.stationnaam.regio} - ${data.stationnaam.value}`;

    this.getPanes().overlayLayer.appendChild(element);
  }

  onRemove() {
    this.element.parentNode.removeChild(this.element);
    this.element = null;
  }

  draw() {
    const pos = this.getProjection().fromLatLngToDivPixel(this.position);
    Object.assign(this.element.style, {
      left: `${pos.x - (MARKER_WIDTH / 2)}px`,
      top: `${pos.y - (MARKER_HEIGHT / 2)}px`,
    });
  }
}
/* harmony export (immutable) */ exports["a"] = StationMarker;




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony export (immutable) */ exports["a"] = parseXMLString;
/* harmony export (immutable) */ exports["b"] = nodeToJSON;


function parseValue(value) {
  try {
    return JSON.parse(value);
  } catch(err) {
    return value;
  }
}

function parseXMLString(xmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "text/xml");
}

function nodeChildrenToJSON(node) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* reduce */])((acc, childNode) =>
    Object.assign(acc, { [childNode.nodeName]: nodeToJSON(childNode) })
  , {}, node.children);
}

function nodeAttributesToJSON(node) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* reduce */])((acc, attribute) =>
    Object.assign(acc, { [attribute.name]: parseValue(attribute.value) })
  , {}, node.attributes)
}

function nodeToJSON(node) {
  if (node.children.length) {
    return nodeChildrenToJSON(node);
  }
  if (node.hasAttributes()) {
    return Object.assign(
      { value: node.textContent },
      nodeAttributesToJSON(node)
    );
  }
  return parseValue(node.textContent)
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StationMarkerCluster__ = __webpack_require__(3);
/* harmony export (immutable) */ exports["initMap"] = initMap;




function createMap() {
  const el = document.getElementById('map');
  return new google.maps.Map(el, {
    center: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MAP_CENTER */],
    backgroundColor: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MAP_BACKGROUND */],
    zoom: 4,
    styles: __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MAP_STYLES */],
    disableDefaultUI: true
  });
}

function initMap() {
  const map = createMap();

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api__["a" /* fetchWeatherData */])().then(data => {
    const stations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api__["b" /* getStations */])(data).filter(__WEBPACK_IMPORTED_MODULE_1__api__["c" /* stationHasTemperature */]);
    new __WEBPACK_IMPORTED_MODULE_2__StationMarkerCluster__["a" /* StationMarkerCluster */](map, stations);
  });
}



/***/ })
/******/ ])));