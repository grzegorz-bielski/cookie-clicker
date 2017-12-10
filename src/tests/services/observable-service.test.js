import ObservableService from '../../services/observable/observable';

describe('ObservableService', () => {
	describe('constructor', () => {
		it('should initialize service with observers object', () => {
			const observable = new ObservableService();
			expect(typeof observable.observers).toBe('object');
		});
	});

	describe('addObserver', () => {
		it('should add observers to observers object', () => {
			const observable = new ObservableService();
			observable.addObserver('test.type', jest.fn(), () => true);
			observable.addObserver('test.type', jest.fn(), () => true);
			observable.addObserver('test.typeTwo', jest.fn(), () => true);

			expect(observable.observers['test.type']).toHaveLength(2);
			expect(observable.observers['test.typeTwo']).toHaveLength(1);
		});
	});

	describe('removeObserver', () => {
		it('should remove observers of given type', () => {
			const observable = new ObservableService();
			const observer = () => true;
			observable.addObserver('test.type', observer, () => true);
			observable.addObserver('test.typeTwo', observer, () => true);

			observable.removeObserver('test.type', observer);

			expect(observable.observers['test.type']).toHaveLength(0);
			expect(observable.observers['test.typeTwo']).toHaveLength(1);
		});
	});

	describe('emitEvent', () => {
		it('should do nothing if there is no observers of given type', () => {
			const observable = new ObservableService();
			const observerOneCB = jest.fn();
			const observerTwoCB = jest.fn();

			observable.addObserver('test.type', () => true, observerOneCB);
			observable.addObserver('test.typeTwo', () => true, observerTwoCB);

			observable.emitEvent('test.typeThree', 3);

			expect(observerOneCB).not.toHaveBeenCalled();
			expect(observerTwoCB).not.toHaveBeenCalled();
		});

		it('should call observers\'s callback if there are observers of given type', () => {
			const observable = new ObservableService();
			const observerOneCB = jest.fn();
			const observerTwoCB = jest.fn();
			const observerDiffCB = jest.fn();

			observable.addObserver('test.type', () => true, observerOneCB);
			observable.addObserver('test.type', () => true, observerTwoCB);
			observable.addObserver('test.typeDiff', () => true, observerDiffCB);

			observable.emitEvent('test.type', 3);

			expect(observerOneCB).toHaveBeenCalledWith(3);
			expect(observerTwoCB).toHaveBeenCalledWith(3);
			expect(observerDiffCB).not.toHaveBeenCalled();
		});
	});

	describe('emitEvents', () => {
		it('should call emitEvent for each passed event with data', () => {
			const observable = new ObservableService();
			const observerTwoCB = jest.fn();
			const observerDiffCB = jest.fn();
			const observerDiffTwoCB = jest.fn();

			observable.addObserver('test.type', () => true, observerTwoCB);
			observable.addObserver('test.typeDiff', () => true, observerDiffCB);
			observable.addObserver('test.typeDiffTwo', () => true, observerDiffTwoCB);

			observable.emitEvents([
				{ type: 'test.type', data: 3 },
				{ type: 'test.typeDiff', data: 4 }
			]);

			expect(observerTwoCB).toHaveBeenCalledWith(3);
			expect(observerDiffCB).toHaveBeenCalledWith(4);
			expect(observerDiffTwoCB).not.toHaveBeenCalled();
		});
	});
});