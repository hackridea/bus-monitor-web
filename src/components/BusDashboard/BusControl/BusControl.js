import React, { Component, Fragment } from "react";
import Sidebar from "./Sidebar/Sidebar";
import BusSearch from "./BusSearch/BusSearch";
import BusList from "./BusList/BusList";
export default class BusControl extends Component {
	locobject = {
		buses: [
			{
				name: "Kanthi",
				id: "123",
				init_time: new Date(),
				end_time: new Date(),
				locations: [
					{
						name: "Udupi",
						latitude: 0.46546,
						longitude: 0.76546
					},
					{
						name: "Padubidri",
						latitude: 0.46546,
						longitude: 0.76546
					},
					{
						name: "Mangalore",
						latitude: 0.46546,
						longitude: 0.76546
					}
				]
			}
		]
	};
	state = {
		...this.locobject
	};
	render() {
		return (
			<Fragment>
				<Sidebar />
				<div
					style={{
						width: "100%"
					}}
				>
					<BusSearch />
					<BusList buses={this.state.buses} />
				</div>
			</Fragment>
		);
	}
}
