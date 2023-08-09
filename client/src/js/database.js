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

  //Create connection to the db and the version
  const jateDb = await openDB('jate', 1);

  //Create transaction and specify db and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //Open desire object store
  const store = tx.objectStore('jate');

  //Put method to pass the content
  const request = store.put({ id: 1, data: content });

  //Get confirmation of request
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.error('getDb implemented');
  //Create connection to the db and the version
  const jateDb = await openDB('jate', 1);

  //Create transaction and specify db and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //Open desire object store
  const store = tx.objectStore('jate');

  //getAll method to get data
  const request = store.getAll();

  //Get confirmation of request
  const result = await request;
  console.log('Data from database', result);
};

initdb();
