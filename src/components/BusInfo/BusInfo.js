import React, { Component } from "react";
import BusImage from "./bus-image.png";
import MapLocations from "./MapLocations/MapLocations";
import "./BusInfo.css";
import axios from "axios";
export default class BusInfo extends Component {
	state = {
		name: "",
		id: "",
		init_time: "",
		end_time: "",
		locations: [],
		loading: true
	};
	componentWillMount() {
		axios
			.get(
				"http://192.168.137.1:3001/user/getbus/" +
					this.props.match.params.id
			)
			.then(response => {
				response.data.routes.forEach(route => {
					if (route.routeid == this.props.match.params.route) {
						this.setState({
							loading: false,
							...route
						});
						console.log("r", route);
						return;
					}
				});
			});
	}
	render() {
		return (
			<div className="bus-information">
				{!this.state.loading && (
					<div
						style={{
							display: "flex"
						}}
					>
						<div className="bus-information-image">
							<img src={BusImage} />
						</div>
						<div
							style={{
								width: "100%"
							}}
						>
							<div className="bus-information-details">
								<div className="header">{this.state.name}</div>
								<div>ID : {this.state.id}</div>
							</div>

							<div className="bus-information-details">
								<div className="info">
									From : {this.state.locations[0].name}
								</div>
								<div className="info">
									To :{" "}
									{
										this.state.locations[
											this.state.locations.length - 1
										].name
									}
								</div>
							</div>
							<div className="bus-information-details">
								<div className="info">
									Start time :{" "}
									{new Date(this.state.init_time).getHours()}
								</div>
								<div className="info">
									End Time :{" "}
									{new Date(this.state.end_time).getHours()}
								</div>
							</div>

							{this.state.locations.length > 2 && (
								<div className="bus-information-details">
									<div className="info">
										Through :
										{this.state.locations.map(
											(location, index) => {
												let comma = ",";
												if (
													index === 0 ||
													index ===
														this.state.locations
															.length -
															1
												)
													return null;
												if (
													index ===
													this.state.locations
														.length -
														2
												)
													comma = "";
												return (
													location.name +
													" " +
													comma +
													" "
												);
											}
										)}
									</div>
								</div>
							)}
							<div className="bus-information-details">
								<div className="info">Cost : {15.1} Rs</div>
							</div>
						</div>
					</div>
				)}
				{this.state.locations.length && (
					<div className="map-information">
						<MapLocations locations={this.state.locations} />
					</div>
				)}
			</div>
		);
	}
}
