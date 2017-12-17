import { h } from 'preact';

import style from './style';
import githubIcon from '../../../assets/images/github.svg';
import trashIcon from '../../../assets/images/trash.svg';

import { app } from '../../../services';

export default class Stats {
	resetHandler = () => app.resetGame();

	render({ sub }) {
		return (
			<header class={style.stats} >
				<h1>
					{sub && sub.name}
				</h1>
				<span class={style.cps}>
					cookies baked so far:
				</span>
				<span class={style.quantity}>
					{sub && sub.cookiesDisplay}
				</span>
				<span class={style.cps}>
					per second: { sub && sub.cookiesPerSecond}
				</span>
				<a
					class={style.github}
					title="Checkout my github!"
					aria-label="Checkout my github!"
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/Pesiok/cookie-clicker"
				>
					<img aria-hidden="true" src={githubIcon} alt="" />
				</a>
				<button
					class={style.trash}
					title="Throw away all cookies and recipes"
					aria-label="Throw away all cookies and recipes!"
					onClick={this.resetHandler}
				>
					<img aria-hidden="true" src={trashIcon} />
				</button>
			</header>
		);
	}
}

