import {
	APP_STATE_CHANGED
} from '../observable/observable-events';
import { setInterval } from 'timers';

// StateService is a data store for whole app
// By using it's methods you are changing global state
// which is then automatically injected into `sub` prop
// to all components that are inside SubscribeToState HOC
export default class StateService {
	constructor({ observable, state }) {
		this.observable = observable;
		this.state = state;
		console.log(state);
		this.produceCookies();
	}

	// TODO: Save state to IndexedDB
	saveState() {
		//
	}

	// TODO: bugged
	getCookiesPerSecond() {
		this.state.cookiesPerSecond = this.state.buildings.reduce(
			(acc = 0, curr) => {
				console.log(acc +  curr.getCookiesPerSecond());
				// console.log(acc+= curr.getCookiesPerSecond())
				return acc + curr.getCookiesPerSecond();
			}
		);
	}

	produceCookies() {
		const refreshRate = 1;

		setInterval(() => {
			this.state.cookiesQuantity =+ this.state.cookiesPerSecond;
			this.refresh();
		}, refreshRate * 1000);
	}

	buyBuilding(name) {
		// const building = this.state.buildings[name];
		// if (building)
	}

	addCookies(num = this.state.cookiesPerClick) {
		this.state.cookiesQuantity += num;
		this.refresh();
	}

	delCookies(num) {
		this.state.appState.cookiesQuantity -+ num;
		this.refresh();
	}

	refresh() {
		this.getCookiesPerSecond();
		this.observable.emitEvent(APP_STATE_CHANGED, this.state);
	}

}