import { h } from 'preact';

import { SubscribeToState } from '../common/subscribe-to';
import Store from '../store';

const StoreContainer = () => (
	<SubscribeToState>
		<Store />
	</SubscribeToState>
);

export default StoreContainer;