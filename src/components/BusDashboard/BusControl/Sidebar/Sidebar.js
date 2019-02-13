import React, { Component } from "react";
import "./Sidebar.css";
import { CustomInput, Button } from "../../../../library";
import { Context } from "../../../Context/Context";
export default class Sidebar extends Component {
	static contextType = Context;
	state = {
		from: "",
		to: "",
		date: "",
		month: "",
		hour: ""
	};
	change = field => value => {
		this.setState({
			[field]: value
		});
	};
	search = () => {
		console.log("Searching");
	};
	componentWillMount() {
		this.setState({
			from: this.context.getLocation().from,
			to: this.context.getLocation().to
		});
	}
	render() {
		return (
			<div className="sidebar">
				<div
					style={{
						fontSize: "25px",
						padding: "20px",
						paddingBottom: "5px"
					}}
				>
					Bus Search
				</div>
				<div className="padded">
					<CustomInput
						label="From"
						defaultValue={this.context.getLocation().from}
						watcher={this.change("from")}
						triggerOnChange={true}
					/>
				</div>
				<div className="padded">
					<CustomInput
						label="To"
						defaultValue={this.context.getLocation().to}
						watcher={this.change("to")}
						triggerOnChange={true}
					/>
				</div>
				<div>
					<div className="third">
						<CustomInput
							value={this.state.date}
							defaultValue={""}
							label="date"
							watcher={this.change("date")}
							triggerOnChange={true}
						/>
					</div>
					<div className="third">
						<CustomInput
							value={this.state.month}
							defaultValue={""}
							label="month"
							watcher={this.change("month")}
							triggerOnChange={true}
						/>
					</div>
					<div className="third">
						<CustomInput
							defaultValue={""}
							value={this.state.hour}
							label="hour"
							watcher={this.change("hour")}
							triggerOnChange={true}
						/>
					</div>
				</div>
				<div
					style={{
						textAlign: "right",
						paddingRight: "20px"
					}}
				>
					<Button variant="info" size="vsmall" onClick={this.search}>
						Search
					</Button>
				</div>
			</div>
		);
	}
}
