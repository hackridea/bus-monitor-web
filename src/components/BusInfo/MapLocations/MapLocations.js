import React, { Component, Fragment } from "react";
import axios from "axios";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polyline,
	lineSymbol
} from "react-google-maps";
const getCoordinates = coordinates => {
	return new Promise(resolve => {
		let coordinateString = "";
		coordinates.forEach(point => {
			coordinateString += point.lat + "," + point.lng + "|";
		});
		coordinateString = coordinateString.slice(0, -1);
		let link =
			"https://roads.googleapis.com/v1/snapToRoads?path=" +
			coordinateString +
			"&interpolate=true&key=AIzaSyCcROrMdLU1PuJlY6euq4RRNPxkeYy2_bk";
		axios.get(link).then(response => {
			let points = [];
			response.data.snappedPoints.forEach(point => {
				points.push({
					lat: point.location.latitude,
					lng: point.location.longitude
				});
			});
			resolve(points);
		});
	});
};

let pathCoordinates = [];
const MyMapComponent = withScriptjs(
	withGoogleMap(props => {
		getCoordinates(pathCoordinates);
		return (
			<GoogleMap defaultZoom={8} defaultCenter={props.points[0]}>
				<Polyline
					path={props.points}
					geodesic={true}
					options={{
						strokeColor: "#ff2527",
						strokeOpacity: 0.75,
						strokeWeight: 2,
						icons: [
							{
								icon: lineSymbol,
								offset: "0",
								repeat: "20px"
							}
						]
					}}
				/>
				<Marker position={{ lat: -34.397, lng: 150.644 }} />
			</GoogleMap>
		);
	})
);

export default class MapLocation extends Component {
	state = {
		loading: true,
		points: []
	};
	componentWillMount() {
		pathCoordinates = [];
		this.props.locations.forEach(location => {
			pathCoordinates.push({
				lat: location.lat,
				lng: location.lon
			});
		});
		getCoordinates(pathCoordinates).then(points => {
			console.log(points);
			this.setState({
				points: points,
				loading: false
			});
		});
	}
	render() {
		return (
			<Fragment>
				{!this.state.loading && (
					<MyMapComponent
						isMarkerShown
						points={this.state.points}
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcROrMdLU1PuJlY6euq4RRNPxkeYy2_bk&v=3.exp&libraries=geometry,drawing,places"
						loadingElement={<div style={{ height: "100%" }} />}
						containerElement={<div style={{ height: "400px" }} />}
						mapElement={<div style={{ height: "100%" }} />}
					/>
				)}
			</Fragment>
		);
	}
}
