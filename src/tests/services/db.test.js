// import indexedDB from 'fake-indexeddb';
import DbService from '../../services/database/db';

// idb temp Mock //

class DbMock {
	constructor() {
		const self = this;
		this.names = [];
		this.stores = {};
		this.objectStoreNames = {
			contains(store) {
				return self.names.includes(store);
			}
		};
	}
	createObjectStore(store, { keyPath }) {
		const newStore = {};
		this.names.push(store);
		this.stores[keyPath] = newStore;
		this.stores[store] = newStore;
	}
	transaction() {
		const self = this;
		return {
			objectStore(store) {
				return {
					put(data) {
						self.stores[store] = data;
						return Promise.resolve({ complete: true });
					},
					getAll() {
						return Promise.resolve(self.stores[store]);
					}
					// clear() {
					// 	delete self.stores[store];
					// }
				};
			}
		};
	}
}

const idbMock = {
	dbs: {},
	open(name, version, cb) {
		this.dbs[name] = new DbMock();
		cb(this.dbs[name]);
		return Promise.resolve(this.dbs[name]);
	}
};

///

describe('DBService', () => {
	it('creates new database on init', async () => {
		const dbService = new DbService({
			driver: idbMock,
			name: 'test-db',
			stores: [{ store: 'test-store', key: 'test' }],
			key: 1
		});

		const db = await dbService.dbPromise;
		const store = await db.transaction('test-store')
			.objectStore('test-store').getAll();

		expect(store).toBeDefined();
	});

	it('writes to the DB', async () => {
		const dbService = new DbService({
			driver: idbMock,
			name: 'test-db',
			stores: [{ store: 'test-store3', key: 'test' }],
			key: 1
		});
		const data = { cookies: 5 };
		await dbService.write('test-store3', data);

		const db = await dbService.dbPromise;
		const storeData = await db.transaction('test-store3')
			.objectStore('test-store3').getAll('test-store3');

		expect(storeData).toBe(data);
	});

	it('reads all data from the store', async () => {
		const dbService = new DbService({
			driver: idbMock,
			name: 'test-db',
			stores: [{ store: 'test-store2', key: 'test' }],
			key: 1
		});
		const data = { cookies: 6 };
		const db = await dbService.dbPromise;
		await db.transaction('test-store2')
			.objectStore('test-store2').put(data);

		const dbData = await dbService.readAll('test-store2');
		
		expect(dbData).toBe(data);
	});
});