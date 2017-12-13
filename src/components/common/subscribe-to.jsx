import { h } from 'preact';
import Subscribe from './subscribe';
import { observable } from '../../services';
import { APP_STATE_CHANGED } from '../../services/observable/events';

// SubscribeToState is a higher order component that injects global app state into props of it's children
// It is triggered by APP_STATE_CHANGED event
export const SubscribeToState = ({ children }) => (
	<Subscribe to={APP_STATE_CHANGED} from={observable}>
		{children}
	</Subscribe>
);
