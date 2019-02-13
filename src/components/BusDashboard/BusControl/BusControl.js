import React, { Component, Fragment } from "react";
import Sidebar from "./Sidebar/Sidebar";
import BusSearch from "./BusSearch/BusSearch";
import BusList from "./BusList/BusList";
export default class BusControl extends Component {
	render() {
		return (
			<Fragment>
				<Sidebar />
				<BusSearch />
				<BusList />
			</Fragment>
		);
	}
}
