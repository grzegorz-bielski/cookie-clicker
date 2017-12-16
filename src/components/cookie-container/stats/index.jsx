import { h } from 'preact';
import style from './style';

const Stats = ({ sub }) => (
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
	</header>
);

export default Stats;
