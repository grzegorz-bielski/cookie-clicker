import {
	APP_STATE_CHANGED
} from '../observable/observable-events';

// StateService encapsulates game logic and serves as data store for whole app
// By using it's methods you are changing global state
// which is then automatically injected into `sub` prop
// to all components that are inside SubscribeToState HOC
export default class StateService {
	constructor({ observable, state }) {
		this.observable = observable;
		this.state = state;

		// init
		this.calculateCookiesPerSecond();
		this.startGame();
	}

	// // TODO: Save state to IndexedDB
	// saveState() {
	// 	//
	// }

	calculateCookiesPerSecond() {
		this.state.cookiesPerSecond = this.state.buildings
			.map(building => building.calculateCookiesPerSecond())
			.reduce((acc, curr) => acc + curr);
	}

	startGame() {
		// get delta of timestamps to calculate number of passed seconds
		const timestamp = () => (
			window.performance && window.performance.now
				? window.performance.now()
				: new Date().getTime()
		);
		let now;
		let delta;
		let last = timestamp();

		// game loop
		const frame = () => {
			now = timestamp();
			delta = (now - last) / 1000;
			this.update(delta);
			this.render();
			last = now;
			requestAnimationFrame(frame);
		};

		requestAnimationFrame(frame);
	}

	// game logic
	update(secondsPassed = null) {
		if (secondsPassed) {
			// add cookies every second
			this.state.cookiesQuantity += this.state.cookiesPerSecond * secondsPassed;
		}
		// show whole cookies
		this.state.cookiesDisplay = Math.floor(this.state.cookiesQuantity);
		// get current price of buildings
		this.state.buildings.forEach(
			building => building.checkIfAffordable(this.state.cookiesDisplay)
		);
	}

	render() {
		// inject new state into 'sub' prop of SubscribeToState's HOC children
		this.observable.emitEvent(APP_STATE_CHANGED, this.state);
	}

	buyBuilding(name, quantity = 1) {
		const building = this.state.buildings.find(building => building.name === name);
		const price = building.buy(this.state.cookiesQuantity, quantity);

		if (price) {
			this.state.cookiesQuantity -= price;
			this.calculateCookiesPerSecond();
			this.requestRefresh();
		}
	}

	click(num = this.state.cookiesPerClick) {
		this.state.cookiesQuantity += num;
		this.requestRefresh();
		// console.log(this.state);
	}

	requestRefresh() {
		this.update();
		this.render();
	}

}