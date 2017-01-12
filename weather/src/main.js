import { MAP_CENTER, MAP_STYLES, MAP_BACKGROUND } from './constants';
import { fetchWeatherData, getStations, stationHasTemperature } from './api';
import { StationMarkerCluster } from './StationMarkerCluster';

function createMap() {
  const el = document.getElementById('map');
  return new google.maps.Map(el, {
    center: MAP_CENTER,
    backgroundColor: MAP_BACKGROUND,
    zoom: 4,
    styles: MAP_STYLES,
    disableDefaultUI: true
  });
}

export function initMap() {
  const map = createMap();

  fetchWeatherData().then(data => {
    const stations = getStations(data).filter(stationHasTemperature);
    new StationMarkerCluster(map, stations);
  });
}

