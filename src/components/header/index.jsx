import { h } from 'preact';
import style from './style';

import { app } from '../../services';

export default class Header {
	resetHandler = () => app.resetGame();

	render({ sub }) {
		return (
			<header class={style.header}>
				<h1>Cookies: {sub && sub.cookiesDisplay}</h1>
				<span>{sub && sub.name}</span>
				<span>CpS: { sub && sub.cookiesPerSecond}</span>
				<button onClick={this.resetHandler}>reset</button>
			</header>
		);
	}
}
