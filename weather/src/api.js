import { API_URL } from './constants';
import { map } from './utils';
import { parseXMLString, nodeToJSON } from './xmlUtils';

export function fetchWeatherData() {
  return window.fetch(API_URL)
    .then(response => response.text())
    .then(parseXMLString)
}

export function getStations(xmlTree) {
  return map(nodeToJSON, xmlTree.querySelectorAll('actueel_weer > weerstations > weerstation'));
}

export function stationHasTemperature(station) {
  return station.temperatuurGC !== '-';
}

export function getStationLatLng(station) {
  return { lat: station.latGraden, lng: station.lonGraden };
}