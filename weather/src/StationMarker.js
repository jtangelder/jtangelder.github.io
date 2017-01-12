import { round } from './utils';

export const MARKER_WIDTH = 50;
export const MARKER_HEIGHT = 50;

export class StationMarker extends google.maps.OverlayView {
  constructor(map, station) {
    super();

    this.position = new google.maps.LatLng(station.latGraden, station.lonGraden);
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
    element.textContent = `${round(data.temperatuurGC, 1)}`;
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

