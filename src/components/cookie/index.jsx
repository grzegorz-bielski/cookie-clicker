import { h, Component } from 'preact';
import style from './style';
import { appState } from '../../services';

export default class Cookie extends Component {
	clickHander = () => appState.addCookies()
	
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0
		};
	}

	render({ quantity }) {
		return (
			<button class={style.cookie} onClick={this.clickHander}>
				🍪
			</button>
		);
	}
}