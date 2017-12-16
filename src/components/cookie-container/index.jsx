import { h } from 'preact';
// import style from './style';

import { SubscribeToState } from '../common/subscribe-to';
import Stats from '../stats';
import Cookie from '../cookie';

const CookieContainer = () => (
	<div>
		<SubscribeToState>
			<Stats />
		</SubscribeToState>
		<Cookie />
	</div>
);

export default CookieContainer;