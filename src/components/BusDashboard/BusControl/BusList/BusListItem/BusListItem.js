import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BusListItem.css";
import BusImage from "./bus-image.png";
export default class BusListItem extends Component {
	render() {
		return (
			<Link
				className="bus-item"
				to={"/bus/" + this.props.id + "/" + this.props.routeid}
			>
				<div className="bus-image">
					<img src={BusImage} />
				</div>
				<div className="bus-body">
					<div className="header">{this.props.name}</div>
					<div>
						<div className="info">
							From : {this.props.locations[0].name}
						</div>
						<div className="info">
							To :{" "}
							{
								this.props.locations[
									this.props.locations.length - 1
								].name
							}
						</div>
					</div>
					<div>
						{this.props.locations.length > 2 && (
							<div className="info">
								Through :{" "}
								{this.props.locations.map((location, index) => {
									let comma = ",";
									if (
										index === 0 ||
										index ===
											this.props.locations.length - 1
									)
										return null;
									if (
										index ===
										this.props.locations.length - 2
									)
										comma = "";
									return location.name + " " + comma + " ";
								})}
							</div>
						)}
					</div>
				</div>
			</Link>
		);
	}
}
