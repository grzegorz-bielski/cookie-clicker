import { h } from 'preact';
import { render } from 'preact-render-spy';
import Store from '../../components/store-container/store';

describe('Store', () => {
	it('should render store items with buildings', () => {
		const mockState = {
			buildings: [
				{
					name: 'UFO',
					owned: 4,
					price: 999,
					incrQuantity: 34,
					refreshRate: 1,
					cookiesPerSecond: 444,
					picture: 'cursor.svg',
					desc: 'ayy lmao'
				}
			]
		};
		const context = render(<Store sub={mockState} />);

		let children = context.find('StoreItem');

		expect(context.find('h2').text()).toBe('Recipes for more cookies');
		expect(context.find('StoreItem')).toHaveLength(1);
		expect(children.at(0).find('h3').text()).toBe('UFO');
	});
});