import ObservableService from './observerable-service';
import StateService from './state-service';

// initialState, could be loaded from IndexedDB
const initialState = {
	cookiesQuantity: 0,
	cookiesPerClick: 1,
	buildings: {
		//
	}
};

// initialize app state
export const observable = new ObservableService();
export const appState = new StateService({ observable, initialState });