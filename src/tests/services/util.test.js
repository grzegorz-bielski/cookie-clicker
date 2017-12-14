import Structure from '../../services/buildings/structure';
import { getInitialState, transformDbState } from '../../services/game/util';

describe('util', () => {
	describe('getInitialState', () => {
		it('should return initial state', () => {
			const state = getInitialState();

			expect(state).toBeDefined();
			expect(state.cookiesQuantity).toBe(0);
			expect(state.cookiesDisplay).toBe(0);
			expect(state.cookiesPerClick).toBe(1);
			expect(Array.isArray(state.buildings)).toBe(true);
		});

		it('should construct buildings', () => {
			class BigBen extends Structure {
				constructor(owned) {
					super({
						owned,
						baseCost: 12000,
						name: 'BigBen',
						incrQuantity: 47
					});
				}
			}
			const Buildings = { BigBen };

			const state = getInitialState(Buildings);

			expect(state.buildings[0].name).toBe('BigBen');
		});
	});

	describe('transforDbState', () => {
		it('should construct buildings from DB objects', () => {
			const stateMock = {
				name: 'ayy',
				cookiesQuantity: 1000,
				buildings: [
					{
						owned: 3,
						name: 'Cursor'
					},
					{
						owned: 1000,
						name: 'Grandma'
					}
				]
			};
			const state = transformDbState(stateMock);

			expect(state.name).toBe(stateMock.name);
			expect(state.cookiesQuantity).toBe(stateMock.cookiesQuantity);
			expect(state.buildings).toHaveLength(2);
			expect(state.buildings[0].owned).toBe(3);
			expect(state.buildings[0].incrQuantity).toBeDefined();
			expect(state.buildings[1].owned).toBe(1000);
		});
	});
});