import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import StoreItem from '../../components/store-container/store-item';

describe('StoreItem', () => {
	it('should display all building stats', () => {
		const building = {
			affordable: true,
			name: 'UFO',
			owned: 4,
			price: 999,
			incrQuantity: 34,
			refreshRate: 1,
			cookiesPerSecond: 444,
			picture: 'cursor.svg',
			desc: 'ayy lmao'
		};
		const context = shallow(<StoreItem {...building} />);
		const spans = context.find('span');
		
		expect(context.find('h3').text()).toBe('UFO');
		expect(context.find('img').attr('src')).toBe('test-file-stub');
		expect(context.find('img').attr('alt')).toBe(building.name);
		expect(context.find('.storeListItemDesc').text()).toBe(building.desc);

		expect(spans.at(0).text()).toBe('');
		expect(spans.at(1).text()).toBe('Owned: 4');
		expect(spans.at(2).text()).toBe('Price: 999 c');
		expect(spans.at(3).text()).toBe('Production: 34 c/s');
		expect(spans.at(4).text()).toBe('Total production: 444 c/s');
	});

	it('should call buy method on click', () => {
		const building = {
			affordable: true,
			picture: 'cursor.svg'
		};
		const game = {
			buyBuilding: jest.fn()
		};
		const context = shallow(<StoreItem {...building} app={game} />);
		const li = context.find('li');
		li.simulate('click');

		expect(game.buyBuilding).toHaveBeenCalledWith(building.name, 1);
	});

	it('should change style when not affordable', () => {
		const buildingOne = {
			affordable: true,
			picture: 'cursor.svg'
		};

		const buildingTwo = {
			affordable: false,
			picture: 'cursor.svg'
		};

		expect(shallow(<StoreItem {...buildingOne} />).find('li').attr('class'))
			.toBe('storeListItem storeListItemActive');
		
		expect(shallow(<StoreItem {...buildingTwo} />).find('li').attr('class'))
			.toBe('storeListItem storeListItemBlocked');
	});
});