import React from 'react';

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }

  componentDidMount() {
    this.updateMarkers();
  }

  componentDidUpdate() {
    this.updateMarkers();
  }

  updateMarkers() {
    console.log('update...');
  }
}
