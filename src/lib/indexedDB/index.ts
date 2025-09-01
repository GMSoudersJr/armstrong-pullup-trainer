import { dbName, dbVersion } from './constants';
import { schema } from './definitions';

let db: IDBDatabase | undefined = undefined;

export const getDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		if (db) {
			return resolve(db);
		}

		const openRequest = window.indexedDB.open(dbName, dbVersion);

		openRequest.onerror = () => {
			reject(openRequest.error);
		};

		openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const target = event.target as IDBOpenDBRequest;
			const db = target.result;

			schema.stores.forEach((storeSchema) => {
				if (!db.objectStoreNames.contains(storeSchema.name)) {
					const store = db.createObjectStore(storeSchema.name, {
						keyPath: storeSchema.keyPath
					});
					storeSchema.indexes.forEach((index) => {
						store.createIndex(index.name, index.keyPath, index.options);
					});
				}
			});
		};

		openRequest.onsuccess = () => {
			db = openRequest.result;
			resolve(db);
		};
	});
};

export const initializeIDB = async () => {
	await getDB();
	// @ts-expect-error might not be imported
	if (typeof WEEK_TEST_DATA !== 'undefined') {
		const db = await getDB();
		let transaction = db.transaction('weeksStore', 'readwrite');
		if (!transaction) return;
		transaction.oncomplete = () => console.log('Finished adding data.');
		const store = transaction.objectStore('weeksStore');
		const request = store.getAll();

		request.onerror = (err) => console.warn(err);
		request.onsuccess = () => {
			if (request.result.length === 0) {
				// @ts-expect-error might not be imported
				WEEK_TEST_DATA.forEach((entry) => {
					const request = store.add(entry);
					request.onerror = (err) => console.warn(err);
					request.onsuccess = () => {
						console.log(`successfully added week ${entry.number} of test data`);
					};
				});
			}
		};
	} else {
	}
};
