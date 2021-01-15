import { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { MapMarker } from './MapMarker';

export class _MapContainer extends Component {
  state = {
    // showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
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
        zoom={13}
        style={{ position: 'relative', width: '100%', height: 200, margin: 'auto' }}>

        <Marker
          onClick={this.onMarkerClick}
          // title={'The marker`s title will appear as a tooltip.'}
          name={'Tel-Aviv: dizingov, 23'}
          position={{lat: hostCreds.lat, lng: hostCreds.lng}}
          style={{ backgroundImage: 'url(https://www.ixxiyourworld.com/media/2391858/ixxi-paul-fuentes-fashion-lama.jpg?mode=crop&width=562&height=749)' }} />

        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export const MapContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyCH-jmqS38VxKTB2yaaz9xPB95yW3TyeG4')
})(_MapContainer)