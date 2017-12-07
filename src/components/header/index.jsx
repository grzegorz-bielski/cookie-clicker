import { h, Component } from 'preact';
import style from './style';

export default class Header extends Component {
	constructor(props) {
		super(props);
		console.log('Header loader: ', props);
	}
	componentWillReceiveProps(newProps) {
		console.log('Header: ', newProps);
	}

	render({ sub }) {
		return (
			<header class={style.header}>
				<h1>Cookies: {sub && sub.cookiesQuantity}</h1>
			</header>
		);
	}
}
