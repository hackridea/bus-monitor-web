import React, { Component } from "react";
import "./App.css";
import GetRouteInformation from "./components/GetRouteInformation/GetRouteInformation";
class App extends Component {
	render() {
		return (
			<div className="App">
				<GetRouteInformation />
			</div>
		);
	}
}

export default App;
