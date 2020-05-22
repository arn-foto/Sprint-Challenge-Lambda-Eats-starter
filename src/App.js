import React from 'react';
import Pizza  from './Pizza';
import Home from './Home';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
	return (
		<Router>
			<nav className="navbar">
				<Link to="/">
					<button name="homebutton">Home</button>
				</Link>
				<br />
				<Link to="/Pizza">
					<button name="orderbutton">Order</button>
				</Link>
			</nav>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/Pizza" component={Pizza} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
