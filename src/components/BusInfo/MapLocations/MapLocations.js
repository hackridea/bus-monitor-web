import React, { Component, Fragment } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polyline,
	lineSymbol
} from "react-google-maps";
let socket = io("http://192.168.137.1:3001");
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
			if (
				!response.data.snappedPoints ||
				response.data.snappedPoints.length < coordinates.length
			) {
				points = coordinates;
			} else {
				response.data.snappedPoints.forEach(point => {
					points.push({
						lat: point.location.latitude,
						lng: point.location.longitude
					});
				});
			}
			resolve(points);
		});
	});
};

let pathCoordinates = [];
const MyMapComponent = withScriptjs(
	withGoogleMap(props => {
		return (
			<GoogleMap defaultZoom={15} defaultCenter={props.points[0]}>
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
				<Marker
					position={{
						lat: props.current.lat * 1,
						lng: props.current.lng * 1
					}}
				/>
			</GoogleMap>
		);
	})
);

export default class MapLocation extends Component {
	state = {
		loading: true,
		points: [],
		current_location: {
			lat: this.props.locations[0].lat,
			lng: this.props.locations[0].lng
		}
	};
	componentWillMount() {
		pathCoordinates = [];
		this.props.locations.forEach(location => {
			pathCoordinates.push({
				lat: location.lat,
				lng: location.lon
			});
		});
		console.log(this.props.locations);
		getCoordinates(pathCoordinates).then(points => {
			console.log(points);
			this.setState({
				points: points,
				loading: false
			});
		});
	}
	constructor(props) {
		super(props);
		socket.on("currentData", info => {
			console.log(info);
			if (info.routeid == this.props.route)
				this.setState({
					current_location: {
						lat: info.lat,
						lng: info.lng
					}
				});
		});
	}
	render() {
		return (
			<Fragment>
				{!this.state.loading && (
					<MyMapComponent
						isMarkerShown
						current={this.state.current_location}
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
