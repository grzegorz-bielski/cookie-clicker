import { h } from 'preact';
import { shallow } from 'preact-render-spy';

import Cookie from '../../components/cookie-container/cookie';

describe('Cookie', () => {
	it('calls app\'s click method on click', () => {
		const game = {
			click: jest.fn()
		};
		const context = shallow(<Cookie app={game} />);
		const btn = context.find('button');

		btn.simulate('click');
		
		expect(game.click).toHaveBeenCalled();
	});
});