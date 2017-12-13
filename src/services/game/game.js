import {
	APP_STATE_CHANGED
} from '../observable/events';
import { getInitialState } from './util';

// GameService encapsulates game logic and serves as data store for whole app
// By using it's methods you are changing global state
// which is then automatically injected into `sub` prop
// to all components that are inside SubscribeToState HOC
export default class GameService {
	constructor({ observable, state, stateService, dbService, saveInterval }) {
		// dependencies
		this.observable = observable;
		this.state = state;
		this.dbService = dbService;

		// init
		this.calculateCookiesPerSecond();
		this.startGame();
		this.autoSave(saveInterval);
	}

	// save state to the Db on regular basis
	autoSave(seconds) {
		setInterval(() => this.dbService.write('state', this.state), seconds * 1000);
	}

	// resetGame removes all saved data from db store and restores initial values
	resetGame() {
		this.dbService.clear('state');
		this.state = getInitialState();
		this.calculateCookiesPerSecond();
	}

	// get cookies per second from every currently owned building and calculate global CpS.
	calculateCookiesPerSecond() {
		this.state.cookiesPerSecond = this.state.buildings
			.map(building => building.calculateCookiesPerSecond())
			.reduce((acc, curr) => acc + curr);
	}

	// start game loop
	startGame() {
		// `requestAnimationFrame` will stop it's execution after tab is blurred
		// but thanks to `delta` the right amount of cookies will be calculated
		// according to seconds passed since last frame
		const timestamp = () => (
			window.performance && window.performance.now
				? window.performance.now()
				: new Date().getTime()
		);
		let now;
		let delta;
		let last = timestamp();

		const frame = () => {
			now = timestamp();
			delta = (now - last) / 1000;
			this.update(delta);
			this.render();
			last = now;

			requestAnimationFrame(frame);
		};
		
		// start loop
		requestAnimationFrame(frame);
	}

	// game logic
	// runs on every frame and on a request
	update(secondsPassed = null) {
		// if seconds are passed in then add cookies for passed second
		if (secondsPassed) {
			this.state.cookiesQuantity += this.state.cookiesPerSecond * secondsPassed;
		}

		// show whole cookies
		this.state.cookiesDisplay = Math.floor(this.state.cookiesQuantity);

		// get current price of buildings
		// use whole cookies for calculcation to make it more sane for user
		this.state.buildings.forEach(
			building => building.checkIfAffordable(this.state.cookiesDisplay)
		);
	}

	// emit events that will instruct Preact to re-render DOM
	render() {
		// inject new state into 'sub' prop of SubscribeToState's HOC children
		this.observable.emitEvent(APP_STATE_CHANGED, this.state);
	}

	// if building is affordable then buy it, recalculate CpS and request update
	buyBuilding(name, quantity = 1) {
		const building = this.state.buildings.find(building => building.name === name);
		const price = building.buy(this.state.cookiesQuantity, quantity);

		if (price) {
			this.state.cookiesQuantity = Math.ceil(10 * (this.state.cookiesQuantity - price)) / 10;
			this.calculateCookiesPerSecond();
			this.requestRefresh();
		}
	}

	// click on a cookie
	click(num = this.state.cookiesPerClick) {
		this.state.cookiesQuantity += num;
		this.requestRefresh();
	}

	requestRefresh() {
		this.update();
		this.render();
	}

}