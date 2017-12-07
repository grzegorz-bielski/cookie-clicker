import { h } from 'preact';

import { SubscribeToState } from './common/subscribe';
import { appState } from '../services';
import Header from './header';
import Cookie from './cookie';

export default class App {
	componentDidMount() {
		appState.refresh();
	}

	render() {
		return (
			<div id="app">
				<SubscribeToState>
					<Header />
				</SubscribeToState>
				<Cookie />
			</div>
		);
	}
}