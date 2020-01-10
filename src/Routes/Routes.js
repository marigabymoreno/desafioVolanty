import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Pages/Home';

const Routes = () => (
	<div className="App">
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default Routes;