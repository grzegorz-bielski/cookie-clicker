
// ObservableService is a class that implements observer pattern
// it will run callbacks registered to specific events upon calling `emitEvent`.
// Do not use it directly when dealing with global app state. Use `StateService`s methods instead.
// It could be helpful with other actions though.
export default class ObservableService {
	constructor() {
		this.observers = {};
	}

	addObserver(eventType, observer, callback) {
		this.observers[eventType] = (this.observers[eventType]
			? [...this.observers[eventType], { observer, callback }]
			: [{ observer, callback }]
		);
	}

	removeObserver(eventType, observer) {
		this.observers[eventType] = this.observers[eventType]
			.filter(current => current.observer !== observer);
	}

	emitEvent(eventType, data) {
		const eventObs = this.observers[eventType];
		if (!eventObs || eventObs.length < 0) {
			return;
		}
		eventObs.forEach(current => current.callback(data));
	}

	emitEvents(events) {
		events.forEach(({ type, data }) => this.emitEvent(type, data));
	}
}
