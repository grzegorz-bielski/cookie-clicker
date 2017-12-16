import { h } from 'preact';
import style from './style';
// import images from '../../assets/images/buildings';

import { app } from '../../services';

const Store = ({ sub }) => (
	<div class={style.store}>
		<h2>Recipes to bake more cookies</h2>
		<ul class={style.storeList}>
			{ sub && sub.buildings.map(({ 
				name,
				owned,
				affordable,
				cookiesPerSecond,
				price,
				picture,
				desc,
				incrQuantity,
				refreshRate
			}) => {
				const buy = () => app.buyBuilding(name, 1);
				// console.log(images);
				return (
					<li
						class={affordable ? style.active : style.blocked}
						onClick={buy}
						key={name}
					>
						<h2>{name}</h2>
						<img class={style.icon} src={require(`../../assets/images/buildings/${picture}`)} alt={name} />
						<div>Owned: {owned}</div>
						<div>Price: {price}</div>
						<div>{desc}</div>
						<div>Each {name} produces {incrQuantity * refreshRate} cookies/second</div>
						<div>All {name}s produces {cookiesPerSecond} cookies/second</div>
					</li>
				);
			})}
		</ul>
	</div>
);

export default Store;