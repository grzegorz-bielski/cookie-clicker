import { h } from 'preact';
import style from './style';

import { appState } from '../../services';

const Store = ({ sub }) => (
	<ul class={style.store}>
		{ sub && sub.buildings.map(({ name, owned, affordable, cookiesPerSecond, price }) => { 
			const buy = () => appState.buyBuilding(name, 1);
			return (
				<li
					class={affordable ? style.active : style.blocked}
					onClick={buy}
				>
					<h2>{name}</h2>
					<div>Owned: {owned}</div>
					<div>Price; {price}</div>
					<div>CpR: {cookiesPerSecond}</div>
				</li>
			);
		})}
	</ul>
);

export default Store;