import { h } from 'preact';
import style from './style';

import { SubscribeToState } from '../common/subscribe-to';
import Stats from './stats';
import Cookie from './cookie';

const CookieContainer = () => (
	<div class={style.cookieContainer}>
		<SubscribeToState>
			<Stats />
		</SubscribeToState>
		<div class={style.cookieWrapper}>
			<Cookie />
		</div>
	</div>
);

export default CookieContainer;