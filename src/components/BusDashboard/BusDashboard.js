import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../Context/Context";

export default class BusDashboard extends Component {
	static contextType = Context;
	render() {
		let location = this.context.getLocation();
		let location_present = true;
		let render = null;
		if (!location.from || !location.to) location_present = false;
		if (!location_present) render = <Redirect to="/" />;
		return (
			<Fragment>
				{render}
				Bus Component
			</Fragment>
		);
	}
}
