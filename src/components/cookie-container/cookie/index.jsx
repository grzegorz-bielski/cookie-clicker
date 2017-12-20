import { h } from 'preact';

import style from './style';
import cookie from '../../../assets/images/cookie.svg';

import { app } from '../../../services';

export default class Cookie {
	clickHandler = () => this.props.app ? this.props.app.click() : app.click();
	
	render() {
		return (
			<button class={style.cookie} onClick={this.clickHandler}>
				<img src={cookie} alt="cookie" />
			</button>
		);
	}
}