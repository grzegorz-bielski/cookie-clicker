import { h } from 'preact';

import { SubscribeToState } from './common/subscribe';
// import { appState } from '../services';

// components
import Header from './header';
import Cookie from './cookie';
import Store from './store';

export default class App {
	componentDidMount() {
		// appState.requestRefresh();
	}

	render() {
		return (
			<div id="app">
				<SubscribeToState>
					<Header />
				</SubscribeToState>
				<Cookie />
				<SubscribeToState>
					<Store />
				</SubscribeToState>
			</div>
		);
	}
}