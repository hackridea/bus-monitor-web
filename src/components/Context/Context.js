import React, { Component, createContext } from "react";

let Context = createContext();

class ContextProvider extends Component {
	state = {
		from: "",
		to: ""
	};
	getLocation = () => {
		return {
			from: this.state.from,
			to: this.state.to
		};
	};
	setLocation = location => {
		return new Promise(resolve => {
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
