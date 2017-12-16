import { h } from 'preact';
import style from './style';

// components
import CookieContainer from '../cookie-container';
import StoreContainer from '../store-container';

const Main = () => (
	<main class={style.main}>
		<CookieContainer />
		<StoreContainer />
	</main>
);

export default Main;