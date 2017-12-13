import { h } from 'preact';
import { deep, render } from 'preact-render-spy';

import Subscribe from '../../components/common/subscribe';
import ObservableService from '../../services/observable/observable';

describe('Subscribe', () => {
	it('mounts it\'s children', () => {
		const Child = ({ sub }) => <h1>{ sub && sub.title }</h1>;
		const context = render(
			<Subscribe>
				<Child />
				<Child />
			</Subscribe>
		);
		context.setState({ subData: { title: 'Hello' } });
		const children = context.find('Child');

		expect(children.at(0).text()).toBe('Hello');
		expect(children.at(1).text()).toBe('Hello');
	});

	it('inject new props into children when observable emits subscribed event', () => {
		const event = 'test.event';
		const observable = new ObservableService();

		const Child = ({ sub }) => <h1>{ sub && sub.title }</h1>;
		const context = render(
			<Subscribe to={event} from={observable}>
				<Child />
				<Child />
			</Subscribe>
		);

		let children = context.find('Child');

		expect(children.at(0).text()).toBe('');
		expect(children.at(1).text()).toBe('');

		observable.emitEvent(event, { title: 'hi' });

		expect(context.state()).toEqual({ subData: { title: 'hi' } });
		context.rerender();
		children = context.find('Child');

		expect(children.at(0).text()).toBe('hi');
		expect(children.at(1).text()).toBe('hi');
	});

	it('remove observer from on unmount', () => {
		const event = 'test.event';
		const removeObserverMock = jest
			.spyOn(ObservableService.prototype, 'removeObserver');
		const observable = new ObservableService();

		const Child = ({ sub }) => <h1>{ sub && sub.title }</h1>;
		const context = deep(
			<Subscribe to={event} from={observable}>
				<Child />
				<Child />
			</Subscribe>
		);

		expect(removeObserverMock).not.toHaveBeenCalled();
		context.render(null);
		expect(removeObserverMock).toHaveBeenCalled();


	});
});

