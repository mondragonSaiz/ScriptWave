import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.error('putDb implemented');

  //Create a new connection to the db and the version we ant to use
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and also specify db and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //Open up the desire object store
  const store = tx.objectStore('jate');

  //Put method
  const request = store.put({ id: 1, data: content });

  //Get confirmation of the request
  const result = await request;
  console.log('Saved to DB', result);
};

export const getDb = async () => {
  console.error('getDb implemented');
  //Create a new connection to the db and the version we want to use
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and also specify db and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //Open up the desire object store
  const store = tx.objectStore('jate');

  //getAll method to get data all data
  const request = store.getAll();

  //Get confirmation of the request
  const result = await request;
  console.log('Data fromDB', result);
};

initdb();
