import { h } from 'preact';
import style from './style';
import { app } from '../../services';

const clickHandler = () => app.click();

const Cookie = ({ sub }) => (
	<button class={style.cookie} onClick={clickHandler}>
	🍪
	</button>
);

export default Cookie;