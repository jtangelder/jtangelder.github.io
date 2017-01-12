import { MAP_CENTER } from './constants';
import { StationMarker, MARKER_WIDTH, MARKER_HEIGHT } from './StationMarker';
import { getStationLatLng } from './api';
import { createAverageObject } from './utils';

function isIntersectingStation(intersectLatLng, baseStation, compareStation) {
  const baseLatLng = getStationLatLng(baseStation);
  const compareLatLng = getStationLatLng(compareStation);
  if (baseStation === compareStation) {
    return false;
  }
  return (
    Math.abs(baseLatLng.lat - compareLatLng.lat) < intersectLatLng.lat &&
    Math.abs(baseLatLng.lng - compareLatLng.lng) < intersectLatLng.lng
  );
}

function removeMarker(marker) {
  marker.setMap(null);
}

function addStationMarker(map, data) {
  return new StationMarker(map, data);
}

export class StationMarkerCluster extends google.maps.OverlayView {
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
    const projection = this.getProjection();
    const center = new google.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng);
    const centerPixel = projection.fromLatLngToContainerPixel(center);
    const offsetPixel = new google.maps.Point(
      centerPixel.x + (MARKER_WIDTH * 1.5),
      centerPixel.y + (MARKER_HEIGHT * 1.5)
    );
    const offset = projection.fromContainerPixelToLatLng(offsetPixel);

    return {
      lat: center.lat() - offset.lat(),
      lng: offset.lng() - center.lng()
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
          createAverageObject([curStation, ...intersections]) :
          curStation
      );
    }

    const addMarker = addStationMarker.bind(null, this.getMap());
    this.markers.forEach(removeMarker);
    this.markers = drawStations.map(addMarker);
  }
}
