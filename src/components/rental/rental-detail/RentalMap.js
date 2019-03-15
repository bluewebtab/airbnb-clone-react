import React from 'react';
import {MapWithGeocode} from '../../map/GoogleMap';

export class RentalMap extends React.Component {


  render(){
    const location = this.props.location;
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeKN1MtTocbSHamcntl3u19FdNytpbqk4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}