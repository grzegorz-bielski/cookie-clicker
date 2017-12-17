import { h } from 'preact';

import style from './style';
import { app } from '../../../services';

export default class StoreItem {
	buy = () => app.buyBuilding(this.props.name, 1);

	render(props) {
		return (
			<li
				class={`${style.storeListItem} ${props.affordable ? style.storeListItemActive : style.storeListItemBlocked}`}
				onClick={this.buy}
				key={props.name}
				role="button"
				tabIndex="0"
			>
				<span class={style.foldedCorner} aria-hidden="true" />
				<h3>{props.name}</h3>
				<div class={style.storeListItemInfo}>
					<img class={style.icon} src={require(`../../../assets/images/buildings/${props.picture}`)} alt={props.name} />
					<span>
						Owned: <b>{props.owned}</b>
					</span>
					<span>
						Price: <b>{props.price} c</b>
					</span>
					<span>
						Production: <b>{props.incrQuantity * props.refreshRate} c/s</b>
					</span>
					<span>
						Total production: <b>{props.cookiesPerSecond} c/s</b>
					</span>
				</div>
				<div class={style.storeListItemDesc}>
					{props.desc}
				</div>
			</li>
		);
	}
}