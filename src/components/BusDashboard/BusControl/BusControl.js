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
		raw: { ...this.locobject },
		search_result: this.locobject.buses
	};
	searchIt = keyword => {
		let search_result = [];
		this.state.raw.buses.forEach(bus => {
			if (
				bus.name.toLowerCase().match(keyword) ||
				bus.id.toLowerCase().match(keyword)
			) {
				search_result.push(bus);
			} else {
				let flag = false;
				bus.locations.forEach(location => {
					if (location.name.toLowerCase().match(keyword)) flag = true;
				});
				if (flag) search_result.push(bus);
			}
		});
		this.setState({
			search_result: search_result
		});
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
					<BusSearch search={this.searchIt} />
					<BusList buses={this.state.search_result} />
				</div>
			</Fragment>
		);
	}
}
