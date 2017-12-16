import { h } from 'preact';

import style from './style';
import StoreItem from '../store-item';

const Store = ({ sub }) => (
	<div class={style.store}>
		<h2 class={style.storeRibbon}>
			Recipes for more cookies
		</h2>
		<ul class={style.storeList}>
			{ sub && sub.buildings.map(building => (
				<StoreItem {...building} />
			))}
		</ul>
	</div>
);

export default Store;