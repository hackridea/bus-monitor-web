import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "../../library";
import BusImage from "./bus-image.png";
import MapLocations from "./MapLocations/MapLocations";
import "./BusInfo.css";
import axios from "axios";
class BusInfo extends Component {
	state = {
		name: "",
		id: "",
		init_time: "",
		end_time: "",
		locations: [],
		loading: true,
		showMap: false,
		mapContent: "Show route"
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

	goBack = () => {
		this.props.history.goBack();
	};

	toggleMap = () => {
		this.setState(prevState => ({
			mapContent: prevState.showMap ? "Show Route" : "Hide Route",
			showMap: !prevState.showMap
		}));
	};

	render() {
		const { showMap, mapContent } = this.state;
		return (
			<div className="bus-information">
				<Button
					onClick={this.goBack}
					className="my-2"
					size="vsmall"
					variant="info"
				>
					Go Back
				</Button>
				{!this.state.loading && (
					<div
						style={{
							display: "flex",
							paddingBottom: "20px"
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
								<div>ID: {this.state.id}</div>
							</div>

							<div className="bus-information-details">
								<div className="info">
									<b>From:</b> {this.state.locations[0].name}
								</div>
								<br />
								<br />
								<div className="info">
									<b>To:</b>{" "}
									{
										this.state.locations[
											this.state.locations.length - 1
										].name
									}
								</div>
							</div>
							<div className="bus-information-details">
								<div className="info">
									<b>Start time:</b>{" "}
									{new Date(this.state.init_time).getHours()}{" "}
									hr
								</div>
								<div className="info">
									<b>End Time:</b>{" "}
									{new Date(this.state.end_time).getHours()}{" "}
									hr
								</div>
							</div>

							{this.state.locations.length > 2 && (
								<div className="bus-information-details">
									<div className="info">
										<b>Through:</b>{" "}
										{this.state.locations.map(
											(location, index) => {
												let Comma = (
													<i className="material-icons">
														arrow_right_alt
													</i>
												);
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
													Comma = null;
												return (
													<Fragment>
														{location.name}
														{Comma}
													</Fragment>
												);
											}
										)}
									</div>
								</div>
							)}
							<div className="bus-information-details">
								<div className="info">Cost: {15.1} Rs</div>
							</div>
							<Button onClick={this.toggleMap} className="mx-2">
								{mapContent}
							</Button>
						</div>
					</div>
				)}
				{showMap && this.state.locations.length && (
					<div className="map-information">
						<MapLocations
							id={this.state.id}
							route={this.state.routeid}
							locations={this.state.locations}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(BusInfo);
