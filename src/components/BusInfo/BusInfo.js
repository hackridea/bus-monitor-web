import React, { Component } from "react";
import BusImage from "./bus-image.png";
import "./BusInfo.css";
export default class BusInfo extends Component {
	state = {
		name: "Kanthi",
		id: "123",
		init_time: new Date(),
		end_time: new Date(),
		locations: [
			{
				name: "Udupi",
				lat: 0.46546,
				long: 0.76546
			},
			{
				name: "Padubidri",
				lat: 0.46546,
				lon: 0.76546
			},
			{
				name: "Mangalore",
				lat: 0.46546,
				lon: 0.76546
			}
		]
	};
	render() {
		return (
			<div className="bus-information">
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
								Through :{" "}
								{this.state.locations.map((location, index) => {
									let comma = ",";
									if (
										index === 0 ||
										index ===
											this.state.locations.length - 1
									)
										return null;
									if (
										index ===
										this.state.locations.length - 2
									)
										comma = "";
									return location.name + " " + comma + " ";
								})}
							</div>
						</div>
						<div className="bus-information-details">
							<div className="info">Cost : {15.1} Rs</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
