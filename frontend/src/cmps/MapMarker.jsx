import { Component } from 'react'

import React from 'react';
// import './Marker.css';

export function  MapMarker (props) {
    const {  name, position, img } = props;
    return (
      <div className="marker"
        style={{ cursor: 'pointer', backgroundImage: img}}
        title={name}
        position={position}
      />
    );
  };

  // export default MapMarker;
