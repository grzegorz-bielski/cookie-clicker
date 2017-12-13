import idb from 'idb';
import ObservableService from './observable/observable';
import { getInitialState, transformDbState } from './game/util';
import GameService from './game/game';
import DbService from './database/db';

// inject dependencies and initialize the app

export let app;
export const observable = new ObservableService();

const dbService = new DbService({
	driver: idb,
	name: 'cookie-clicker-db',
	stores: [{ store: 'state', key: 'name' }]
});

dbService.readAll('state').then(state => {
	app = new GameService({
		observable,
		dbService,
		saveInterval: 2,
		state: (!state || state.length <= 0)
			? getInitialState()
			: transformDbState(state[0])
	});
});
