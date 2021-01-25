import { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class _MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {}
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    var { hostCreds } = this.props
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: hostCreds.lat, lng: hostCreds.lng }}
        onClick={this.onMapClicked}
        zoom={15}
        style={{ position: 'relative', width: '100%', height: '300px', margin: 'auto' }}>
        <Marker
          name={'Tel-Aviv: dizingov, 23'}
          position={{ lat: hostCreds.lat, lng: hostCreds.lng }} />
      </Map>
    );
  }
}

export const MapContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyCH-jmqS38VxKTB2yaaz9xPB95yW3TyeG4')
})(_MapContainer)