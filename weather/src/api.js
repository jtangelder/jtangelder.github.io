import { API_URL } from './constants';
import { parseXMLString, nodeToJSON } from './xmlUtils';

function selectAll(xmlTree, selector) {
  return Array.from(xmlTree.querySelectorAll(selector));
}

export function fetchWeatherData() {
  return window.fetch(API_URL)
    .then(response => response.text())
    .then(parseXMLString)
}

export function getStations(xmlTree) {
  return selectAll(xmlTree, 'actueel_weer > weerstations > weerstation').map(nodeToJSON);
}

export function stationHasTemperature(station) {
  return station.temperatuurGC !== '-';
}

export function getStationLatLng(station) {
  return { lat: station.latGraden, lng: station.lonGraden };
}