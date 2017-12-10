import idb from 'idb';

export default class DbService {
	constructor({ name, stores, version }) {
		if ('indexedDB' in window) {
			this.dbPromise = this.createDatabase(name, stores, version = 1);
		}
		else {
			//eslint-disable-next-line
			window.alert('To save your cookies you need to use newer browser!');
		}
	}

	createDatabase(name, stores, version = 1) {
		return idb.open(name, version, db => {
			stores.forEach(({ store, key }) => {
				!db.objectStoreNames.contains(store) && db.createObjectStore(store, { keyPath: key });
			});
		});
	}

	write(store, data) {
		return this.dbPromise.then(db => {
			const transaction = db.transaction(store, 'readwrite').objectStore(store).put(data);

			return transaction.complete;
		});
	}

	readAll(store) {
		return this.dbPromise.then(db => db.transaction(store, 'read').objectStore(store).getAll());
	}
}


