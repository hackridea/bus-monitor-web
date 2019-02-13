import React, { Component, Fragment } from "react";
import "./BusSearch.css";
export default class BusSearch extends Component {
	render() {
		return (
			<Fragment>
				<div className="bus-search">
					<div className="input">
						<input
							type="text"
							placeholder="Enter bus name, bus no, etc"
						/>
						<button>
							<i className="material-icons">search</i>
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
}
