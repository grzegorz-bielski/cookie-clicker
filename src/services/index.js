import 'indexeddb-getall-shim';
import idb from 'idb';

import ObservableService from './observable/observable';
import { getInitialState, transformDbState } from './game/util';
import GameService from './game/game';
import DbService from './database/db';

export let app;
export let observable = new ObservableService();

// inject dependencies and initialize the app

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
