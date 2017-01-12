export const API_URL = 'http://xml.buienradar.nl/';

export const MAP_BACKGROUND = '#483D8B';

export const MAP_CENTER = { lat: 52.1537906, lng: 5.3175972 };

export const MAP_STYLES = [
  {elementType: 'geometry', stylers: [{color: '#7a58d9'}]},
  {elementType: 'labels', stylers: [{visibility: 'off'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: MAP_BACKGROUND }]},
  {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#8b64f8'}]},
];