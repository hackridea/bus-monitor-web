import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import GetRouteInformation from "./components/GetRouteInformation/GetRouteInformation";
import { ContextProvider } from "./components/Context/Context";
import BusDashboard from "./components/BusDashboard/BusDashboard";
class App extends Component {
	render() {
		return (
			<div className="App">
				<ContextProvider>
					<Switch>
						<Route path="/buses" component={BusDashboard} />
						<Route path="/" component={GetRouteInformation} />
					</Switch>
				</ContextProvider>
			</div>
		);
	}
}

export default App;
