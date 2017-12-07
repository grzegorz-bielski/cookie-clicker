import ObservableService from './observable/observerable-service';
import StateService from './state/state-service';
import getState from './state/state-prepare';

// initialize app state
export const observable = new ObservableService();
export const appState = new StateService({
	observable,
	state: getState()
});