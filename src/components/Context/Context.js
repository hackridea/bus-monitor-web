import React, { Component, createContext } from "react";

let Context = createContext();

class ContextProvider extends Component {
	state = {
		from: "",
		to: ""
	};
	constructor(props) {
		super(props);
		let stored_location = false;
		let raw_location = localStorage.getItem("location");
		if (raw_location) {
			stored_location = JSON.parse(raw_location);
			this.state = stored_location;
		}
	}
	getLocation = () => {
		return {
			from: this.state.from,
			to: this.state.to
		};
	};
	setLocation = location => {
		return new Promise(resolve => {
			localStorage.setItem("location", JSON.stringify(location));
			this.setState(
				{
					...location
				},
				resolve()
			);
		});
	};
	render() {
		return (
			<Context.Provider
				value={{
					setLocation: this.setLocation,
					getLocation: this.getLocation
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}
export { ContextProvider, Context };
