import "mapbox-gl/dist/mapbox-gl.css";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import Reports from '../data/reports.js';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2F1c2hhbDE5NyIsImEiOiJjazMzYjkxZjEwc3R5M2hwYTlvdjNpbHR0In0.gROryKsqwukLN_91-lktHQ";

export default class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 43.75,
      longitude: -79.25,
      zoom: 10
    },
    searchResultLayer: null,
    marker: {
      latitude: 43.75,
      longitude: -79.25
    }
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: "450px"
    });
  };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };

  handleClick = ({ lngLat: [longitude, latitude] }) => {
    this.setState({
      marker: {
        latitude: latitude,
        longitude: longitude
      }
    });

    this.props.setLocation(latitude, longitude);
  };


  render() {
    const { viewport, searchResultLayer } = this.state;

    return (
      <ReactMapGL
        ref={this.mapRef}
        onClick={this.handleClick}
        {...viewport}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* {console.log(Reports[0])} */}
        {Reports.map(report => (
          <Marker key={report.id} latitude={report.latitude} longitude={report.longitude}>
            <button className="marker"><img src="/mark.svg" alt="" /></button>
          </Marker>
        ))}

        <Marker key={5} latitude={this.state.marker.latitude} longitude={this.state.marker.longitude} draggable={true} offsetLeft={-75} offsetTop={-30}>
          <button className="marker">
            <div> 
              Where should I go? (Click)
            </div>
            <img src="/mark.svg" alt="" />
          </button>
        </Marker>

        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </ReactMapGL>
    );
  }
}
