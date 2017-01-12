import { StationMarker, MARKER_WIDTH, MARKER_HEIGHT } from './StationMarker';
import { getStationLatLng } from './api';

function removeMarker(marker) {
  marker.setMap(null);
}

function addStationMarker(map, data) {
  return new StationMarker(map, { lat: data.latGraden, lng: data.lonGraden }, data);
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
    // find out how what the distance between a the marker size is to find out intersections
    const pixelA = new google.maps.Point(0, 0);
    const pixelB = new google.maps.Point(MARKER_WIDTH, MARKER_HEIGHT);
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
