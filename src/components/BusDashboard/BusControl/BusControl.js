import React, { Component, Fragment } from "react";
import Sidebar from "./Sidebar/Sidebar";
import BusSearch from "./BusSearch/BusSearch";
import BusList from "./BusList/BusList";
import axios from "axios";
export default class BusControl extends Component {
	state = {
		raw: { buses: [] },
		search_result: [],
		loading: true
	};
	componentWillMount() {
		axios
			.post("http://192.168.137.1:3001/user/getbuses", {
				from: this.props.from,
				to: this.props.to
			})
			.then(response => {
				this.setState({
					loading: false
				});
				if (!response.data.buses.length) return;
				this.setState({
					raw: response.data,
					search_result: response.data.buses
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
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
	search = params => {
		axios
			.post("http://192.168.137.1:3001/user/getbuses", {
				from: params.from,
				to: params.to,
				time: new Date(
					new Date().getFullYear(),
					params.month - 1,
					params.date,
					params.hour
				)
			})
			.then(response => {
				this.setState({
					loading: true
				});
				if (!response.data.buses || !response.data.buses.length) {
					this.setState({
						loading: false,
						raw: { buses: [] },
						search_result: []
					});
				} else {
					this.setState({
						loading: false,
						raw: response.data,
						search_result: response.data.buses
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<Fragment>
				<Sidebar search={this.search} />
				<div
					style={{
						width: "100%"
					}}
				>
					{!this.state.loading && (
						<Fragment>
							<BusSearch search={this.searchIt} />
							<BusList buses={this.state.search_result} />
						</Fragment>
					)}
				</div>
			</Fragment>
		);
	}
}
