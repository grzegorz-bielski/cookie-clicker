import { h } from 'preact';
import Header from '../../components/header';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('Initial Test of the Header', () => {

	it('Header renders 3 nav items', () => {
		const context = shallow(<Header />);
		// expect(context.find('h1').text()).toBe('Preact App');
	});
});