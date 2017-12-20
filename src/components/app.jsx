import { h } from 'preact';

// components
import CookieContainer from './cookie-container';
import StoreContainer from './store-container';

const App = () => (
	<div id="app">
		<CookieContainer />
		<StoreContainer />
	</div>
);

export default App;