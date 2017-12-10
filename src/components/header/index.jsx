import { h } from 'preact';
import style from './style';

const Header = ({ sub }) => (
	<header class={style.header}>
		<h1>Cookies: {sub && sub.cookiesDisplay}</h1>
		<span>{sub && sub.name}</span>
		<span>CpS: { sub && sub.cookiesPerSecond}</span>
	</header>
);

export default Header;
