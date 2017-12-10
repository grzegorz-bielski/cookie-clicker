import GameService from '../../services/game/game';
import ObservableService from '../../services/observable/observable';
import { APP_STATE_CHANGED } from '../../services/observable/events';

describe('GameService', () => {
	beforeEach(() => jest.restoreAllMocks());

	describe('constructor', () => {
		it('should initialize the game', () => {
			const startGameMock = jest.spyOn(GameService.prototype, 'startGame')
				.mockImplementation(() => true);
			const cpsMock = jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond')
				.mockImplementation(() => true);
	
			const app = new GameService({ observable: true, state: true });
	
			expect(app.observable).toBe(true);
			expect(app.state).toBe(true);
			expect(cpsMock).toHaveBeenCalled();
			expect(startGameMock).toHaveBeenCalled();
		});
	});

	describe('calculateCookiesPerSecond', () => {
		it('should add together CpS from all buildings', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			const cpsMock = jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond');
			
			const stateMock = {
				buildings: [
					{ calculateCookiesPerSecond: jest.fn(() => 1) },
					{ calculateCookiesPerSecond: jest.fn(() => 1) }
				]
			};
			const app = new GameService({ observable: true, state: stateMock });
			expect(app.state.cookiesPerSecond).toBe(2);
			// called on init
			expect(cpsMock).toHaveBeenCalled();
		});
	});

	describe('startGame', () => {
		// beforeEach(() => jest.clearAllTimers());
		it('should start a game loop', () => {
			jest.spyOn(GameService.prototype, 'update').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			const rafMock = jest.spyOn(window, 'requestAnimationFrame');

			new GameService({ observable: true, state: true });

			expect(rafMock).toHaveBeenCalled();
		});

		it('should call update and render', () => {
			const updateMock = jest.spyOn(GameService.prototype, 'update').mockImplementation(() => true);
			const renderMock = jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			jest.useFakeTimers();

			new GameService({ observable: true, state: true });

			// requestAtnimationFrame is mocked as stTimeout in this node env
			expect(setTimeout.mock.calls).toHaveLength(1);
			jest.runOnlyPendingTimers();

			expect(updateMock).toHaveBeenCalledTimes(1);
			expect(renderMock).toHaveBeenCalledTimes(1);
		});
	});

	describe('update', () => {
		it('adds cookies per second when seconds are passed in', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
	
			const stateMock = {
				cookiesPerSecond: 1,
				cookiesQuantity: 2.1,
				buildings: [
					{ checkIfAffordable: jest.fn(() => true)  },
					{ checkIfAffordable: jest.fn(() => true) }
				]
			};
	
			const app = new GameService({ observable: true, state: stateMock });
			app.update(1);

			expect(app.state.cookiesQuantity).toBe(3.1);
			expect(app.state.cookiesDisplay).toBe(3);
		});

		it('shouldn\' add cookies per second when seconds are not passed in', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);

			const stateMock = {
				cookiesPerSecond: 1,
				cookiesQuantity: 2.1,
				buildings: [
					{ checkIfAffordable: jest.fn(() => true)  },
					{ checkIfAffordable: jest.fn(() => true) }
				]
			};

			const app = new GameService({ observable: true, state: stateMock });
			app.update();

			expect(app.state.cookiesQuantity).toBe(2.1);
			expect(app.state.cookiesDisplay).toBe(2);
		});

		it('should check if buildings are affordable', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);

			const stateMock = {
				cookiesPerSecond: 1,
				cookiesQuantity: 2.1,
				buildings: [
					{ checkIfAffordable: jest.fn(() => true)  },
					{ checkIfAffordable: jest.fn(() => true) }
				]
			};

			const app = new GameService({ observable: true, state: stateMock });
			app.update();

			expect(app.state.buildings[0].checkIfAffordable)
				.toHaveBeenCalledWith(app.state.cookiesDisplay);
			expect(app.state.buildings[1].checkIfAffordable)
				.toHaveBeenCalledWith(app.state.cookiesDisplay);
		});
	});

	describe('render', () => {
		it('should call emitEvent on observable', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			const emitEventMock = jest.spyOn(ObservableService.prototype, 'emitEvent');

			const observable = new ObservableService();
			const app = new GameService({ observable, state: true });
			app.render();

			expect(emitEventMock).toHaveBeenCalledWith(APP_STATE_CHANGED, true);
		});
	});

	describe('buyBuilding', () => {
		it('calls buy method on right building and lowers cookies quantity if building is affordable ', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			const cprMock = jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			const reqRefMock = jest.spyOn(GameService.prototype, 'requestRefresh').mockImplementation(() => true);


			const stateMock = {
				cookiesQuantity: 15.1,
				buildings: [
					{ buy: jest.fn(() => 15), name: 'Cursor'  },
					{ buy: jest.fn(() => 100), name: 'Grandma' }
				]
			};

			const app = new GameService({ observable: true, state: stateMock });
			app.buyBuilding('Cursor');

			expect(app.state.buildings[0].buy).toHaveBeenCalledWith(15.1, 1);
			expect(app.state.cookiesQuantity).toBe(0.1);
			expect(cprMock).toHaveBeenCalled();
			expect(reqRefMock).toHaveBeenCalled();
		});

		it('shouldn\'t lower cookies quantity if building is not affordable', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			const cprMock = jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			const reqRefMock = jest.spyOn(GameService.prototype, 'requestRefresh').mockImplementation(() => true);

			const stateMock = {
				cookiesQuantity: 15.1,
				buildings: [
					{ buy: jest.fn(() => 15), name: 'Cursor'  },
					{ buy: jest.fn(() => false), name: 'Grandma' }
				]
			};

			const app = new GameService({ observable: true, state: stateMock });
			app.buyBuilding('Grandma');

			expect(app.state.buildings[1].buy).toHaveBeenCalledWith(15.1, 1);
			expect(app.state.cookiesQuantity).toBe(15.1);
			expect(cprMock).toHaveBeenCalledTimes(1);
			expect(reqRefMock).not.toHaveBeenCalled();
		});
	});

	describe('click', () => {
		it('should add cookies per click', () => {
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);
			const reqRefMock = jest.spyOn(GameService.prototype, 'requestRefresh').mockImplementation(() => true);

			const stateMock = {
				cookiesPerClick: 3,
				cookiesQuantity: 2
			};

			const app = new GameService({ observable: true, state: stateMock });
			app.click();
			expect(app.state.cookiesQuantity).toBe(5);
			expect(reqRefMock).toHaveBeenCalled();
		});
	});

	describe('requestRefresh', () => {
		it('should call update and render', () => {
			const updateMock = jest.spyOn(GameService.prototype, 'update').mockImplementation(() => true);
			const renderMock = jest.spyOn(GameService.prototype, 'render').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'startGame').mockImplementation(() => true);
			jest.spyOn(GameService.prototype, 'calculateCookiesPerSecond').mockImplementation(() => true);

			const app = new GameService({ observable: true, state: true });
			app.requestRefresh();

			expect(updateMock).toHaveBeenCalled();
			expect(renderMock).toHaveBeenCalled();
		});
	});
});