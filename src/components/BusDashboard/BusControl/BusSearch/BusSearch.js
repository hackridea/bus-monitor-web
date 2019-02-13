import React, { Component, Fragment } from "react";
import "./BusSearch.css";
export default class BusSearch extends Component {
	state = {
		key: ""
	};
	change = ({ target }) => {
		this.setState({
			key: target.value
		});
	};
	render() {
		return (
			<Fragment>
				<div className="bus-search">
					<div className="input">
						<input
							type="text"
							value={this.state.key}
							onChange={this.change}
							placeholder="Enter bus name, bus no, etc"
						/>
						<button
							onClick={() => this.props.search(this.state.key)}
						>
							<i className="material-icons">search</i>
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
}
