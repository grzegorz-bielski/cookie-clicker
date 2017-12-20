import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Stats from '../../components/cookie-container/stats';

describe('Stats', () => {
	it('should display all stats', () => {
		const mockState = {
			name: 'Bakery name',
			cookiesDisplay: 3,
			cookiesPerSecond: 4
		};

		const context = shallow(<Stats sub={mockState} />);
		const spans = context.find('span');
		
		expect(context.find('h1').text()).toBe(mockState.name);
		expect(spans.at(1).text()).toBe('3');
		expect(spans.at(2).text()).toBe(`per second: ${mockState.cookiesPerSecond}`);
	});

	it('should call app\'s reset method on click', () => {
		const game = {
			resetGame: jest.fn()
		};
		const context = shallow(<Stats app={game} />);
		const btn = context.find('button');

		btn.simulate('click');

		expect(game.resetGame).toHaveBeenCalled();
	});
});

