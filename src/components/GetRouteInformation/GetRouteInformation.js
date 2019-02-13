import React, { Component } from "react";
import "./GetRouteInformation.css";
import { CustomInput, Button } from "../../library";
import { Context } from "../Context/Context";
export default class GetRouteInformation extends Component {
	static contextType = Context;
	state = {
		from: "",
		fromerror: false,
		to: "",
		toerror: "",
		step: 1,
		error: false
	};
	componentWillMount() {
		let location = this.context.getLocation();
		if (location.from && location.to) this.props.history.push("/buses");
	}
	change = field => val => {
		return new Promise(resolve => {
			this.setState(
				{
					[field]: val,
					[field + "error"]: val.length === 0,
					error: val.length === 0
				},
				resolve()
			);
		});
	};
	proceed = () => {
		let errors = ["from", "to"];
		this.change(errors[this.state.step - 1])(
			this.state[errors[this.state.step - 1]]
		).then(() => {
			if (this.state.error) return;
			if (this.state.step === 2) {
				this.context
					.setLocation({
						from: this.state.from,
						to: this.state.to
					})
					.then(() => {
						this.props.history.push("/buses");
					});
				return;
			}
			this.setState(prevstate => ({
				step: prevstate.step + 1
			}));
		});
	};
	render() {
		return (
			<div className="centered">
				{this.state.step === 1 && (
					<div className="step-1">
						<CustomInput
							label="From"
							defaultValue=""
							watcher={this.change("from")}
							triggerOnChange={true}
							error={this.state.fromerror}
							errorMessage={"Cannot be empty"}
						/>
					</div>
				)}

				{this.state.step === 2 && (
					<div className="step-2">
						<CustomInput
							label="To"
							defaultValue=""
							watcher={this.change("to")}
							triggerOnChange={true}
							error={this.state.toerror}
							errorMessage={"Cannot be empty"}
						/>
					</div>
				)}
				<div
					style={{
						textAlign: "right"
					}}
				>
					<Button color="info" size="vsmall" onClick={this.proceed}>
						Next
					</Button>
				</div>
			</div>
		);
	}
}
