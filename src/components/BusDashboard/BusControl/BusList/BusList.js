import React, { Component, Fragment } from "react";
import Bus from "./BusListItem/BusListItem";
export default class BusList extends Component {
	render() {
		let buslist = this.props.buses.map((bus, index) => {
			return <Bus {...bus} key={index} />;
		});
		let renderVar = buslist;
		if (!this.props.buses.length)
			renderVar = <div className="padded-message">No bus here.</div>;
		return <div>{renderVar}</div>;
	}
}
