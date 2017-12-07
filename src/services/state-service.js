import {
	APP_STATE_CHANGED
} from './events';

// StateService is a data store for whole app
// By using it's methods you are changing global state
// which is then automatically injected into `sub` prop
// to all components that are inside SubscribeToState HOC
export default class StateService {
	constructor({ observable, initialState }) {
		this.observable = observable;
		this.state = initialState;
	}

	// TODO: Save state to IndexedDB
	saveState() {
		//
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
		this.observable.emitEvent(APP_STATE_CHANGED, this.state);
	}

}