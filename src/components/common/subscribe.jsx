import preact, { h, Component } from 'preact';
import { observable } from '../../services';
import { APP_STATE_CHANGED } from '../../services/observable/observable-events';

// Subscribe is a higher order component that will inject some data to it's children whenever a specific event occurs
// Could be used to listen to any event, not necessarily to any that involves global app state

// You can subscribe to events by `to` prop from any obseravable passed to 'from' prop
// Data published from observable is accesible in children by `props.sub`
export class Subscribe extends Component {

	onAppStateChange = subData => this.setState({ subData });
	
	constructor(props) {
		super(props);
		this.state = {};
		this.observable = props.from;
	}

	componentDidMount() {
		const { to: event } = this.props;
		if (event) {
			this.observable.addObserver(event, this, this.onAppStateChange);
		}
		
	}

	componentWillUnmount() {
		const { to: event } = this.props;
		if (event) {
			this.observable.removeObserver(event, this);
		}
	}

	render({ children }, { subData }) {
		if (children.length > 1) {
			return (
				<div>
					{children.map(child => preact.cloneElement(child, { sub: subData }))}
				</div>
			);
		}

		return preact.cloneElement(children[0], { sub: subData });
	}
}

// SubscribeToState is a higher order component that injects global app state into props of it's children
// It is triggered by APP_STATE_CHANGED event
export const SubscribeToState = ({ children }) => (
	<Subscribe to={APP_STATE_CHANGED} from={observable}>
		{children}
	</Subscribe>
);