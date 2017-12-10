import Structure from '../../services/buildings/structure';

describe('Structure', () => {
	beforeEach(() => jest.restoreAllMocks());

	describe('constructor', () => {
		it('sets default properties', () => {
			const getPriceMock = jest.spyOn(Structure.prototype, 'getPrice')
				.mockImplementation(() => 15);

			const cursor = new Structure({
				owned: 1,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			expect(cursor.baseCost).toBe(15);
			expect(cursor.owned).toBe(1);
			expect(cursor.name).toBe('Cursor');
			expect(cursor.refreshRate).toBe(0.1);
			expect(cursor.incrQuantity).toBe(1);
			expect(cursor.affordable).toBe(false);
			expect(cursor.cookiesPerSecond).toBe(0);
			expect(getPriceMock).toHaveBeenCalledWith(1);
		});
	});

	describe('getPrice', () => {
		it('returns base price if there is no structures if this type yet', () => {
			const cursor = new Structure({
				owned: 0,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			expect(cursor.getPrice()).toBe(15);
		});

		it('returns higher price if there are already structures of this type', () => {
			const cursor = new Structure({
				owned: 23,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			expect(cursor.getPrice()).toBeGreaterThan(15);
		});
	});

	describe('calculateCookiesPerSecond', () => {
		it('should return and set right number of CpS', () => {
			const cursor = new Structure({
				owned: 1,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			expect(cursor.calculateCookiesPerSecond()).toBe(0.1);
			expect(cursor.cookiesPerSecond).toBe(0.1);
		});
	});

	describe('checkIfAffordable', () => {
		it('should return affordable and price and set affordable if building is currently affordable', () => {
			const cursor = new Structure({
				owned: 0,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			const [affordable, price] = cursor.checkIfAffordable(34, 2);
			expect(affordable).toBe(true);
			expect(cursor.affordable).toBe(true);
			expect(price).toBeGreaterThan(15);
		});

		it('shouldn\'t set affordable if it isn\'t', () => {
			const cursor = new Structure({
				owned: 0,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});

			const [affordable] = cursor.checkIfAffordable(34, 223);
			expect(affordable).toBe(false);
			expect(cursor.affordable).toBe(false);
		});
	});

	describe('buy', () => {
		beforeEach(() => jest.restoreAllMocks());

		it('should call checkIfAffordable with right amount of cookies', () => {
			const checkIfAffordableMock = jest.spyOn(Structure.prototype, 'checkIfAffordable')
				.mockImplementation(() => [true, 15]);
			const cursor = new Structure({
				owned: 0,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});
			const price = cursor.buy(15, 1);

			expect(checkIfAffordableMock).toHaveBeenCalledWith(15, 1);
			expect(price).toBe(15);
			expect(cursor.owned).toBe(1);
			expect(cursor.price).toBeGreaterThan(15);
		});

		it('shouldn\'t increase number of owned buildings if it isn\'t affordable', () => {
			const checkIfAffordableMock = jest.spyOn(Structure.prototype, 'checkIfAffordable')
				.mockImplementation(() => [false, 345]);
			const cursor = new Structure({
				owned: 0,
				baseCost: 15,
				name: 'Cursor',
				refreshRate: 0.1,
				incrQuantity: 1
			});
			const price = cursor.buy(15, 2);

			expect(checkIfAffordableMock).toHaveBeenCalledWith(15, 2);
			expect(price).toBe(false);
			expect(cursor.owned).toBe(0);
			expect(cursor.price).toBe(15);
		});
	});
});