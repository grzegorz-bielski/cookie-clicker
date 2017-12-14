import { h } from 'preact';
import style from './style';

import { app } from '../../services';

const Store = ({ sub }) => (
	<ul class={style.store}>
		{ sub && sub.buildings.map(({ name, owned, affordable, cookiesPerSecond, price }) => {
			const buy = () => app.buyBuilding(name, 1);
			return (
				<li
					class={affordable ? style.active : style.blocked}
					onClick={buy}
					key={name}
				>
					<h2>{name}</h2>
					<div>Owned: {owned}</div>
					<div>Price; {price}</div>
					<div>CpS: {cookiesPerSecond}</div>
				</li>
			);
		})}
	</ul>
);

export default Store;