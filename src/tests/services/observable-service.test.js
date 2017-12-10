import ObservableService from '../../services/observable/observerable-service';
// import { APP_STATE_CHANGED } from '../../services/observable/observable-events';

describe('ObservableService', () => {
	describe('constructor', () => {
		it('should initialize service with observers object', () => {
			const observable = new ObservableService();
			expect(typeof observable.observers).toBe('object');
		});
	});

	describe('addObserver', () => {
		it('should add observer to observers object', () => {
			const observable = new ObservableService();
			observable.addObserver('testType', jest.fn(), () => true);

			// eslint-disable-next-line
			expect(observable.observers['testType']).toHaveLength(1);
		});
	});
});