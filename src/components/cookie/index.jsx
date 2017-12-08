import { h } from 'preact';
import style from './style';
import { appState } from '../../services';

const clickHandler = () => appState.click();

const Cookie = ({ sub }) => (
	<button class={style.cookie} onClick={clickHandler}>
	🍪
	</button>
);

export default Cookie;