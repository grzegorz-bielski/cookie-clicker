import { h } from 'preact';
import style from './style';
import cookie from '../../assets/images/cookie.svg';

import { app } from '../../services';

const clickHandler = () => app.click();

const Cookie = ({ sub }) => (
	<button class={style.cookie} onClick={clickHandler}>
		<img src={cookie} alt="cookie" />
	</button>
);

export default Cookie;