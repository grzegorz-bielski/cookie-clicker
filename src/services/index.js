import ObservableService from './observable/observable';
import Buildings from './buildings/buildings';
import StateService from './game/state';
import GameService from './game/game';
import DbService from './database/db';

// inject dependencies and initialize the app
export let app;
export const observable = new ObservableService();

const dbService = new DbService({
	name: 'cookie-clicker-db',
	stores: [{ store: 'saves', key: 'name' }]
});

const stateService = new StateService({ db: dbService, Buildings });

stateService.loadState().then(state => {
	app = new GameService({ observable, state, stateService });
});
