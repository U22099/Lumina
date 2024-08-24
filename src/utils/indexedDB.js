const init = () => {
    const opendb = indexedDB.open("Lumina");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
		db.createObjectStore("AI_Image");
        db.createObjectStore("ChatData");
        db.createObjectStore("UserData");
    }
    return opendb;
}
const saveData = (data, objStore, key = 1) => {
    const request = init();
    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(objStore, 'readwrite');
        const store = transaction.objectStore(objStore);
        store.put(data, key);
        transaction.oncomplete = () => {
            db.close();
        }
    }
}
const getData = (objStore, key = 1) => {
    const request = init();
    return new Promise(resolve => {
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction(objStore, 'readonly');
            const store = transaction.objectStore(objStore);
            const result = store.get(key);
            result.onsuccess = () => {
                resolve(result.result);
            }
            transaction.oncomplete = () => {
                db.close();
            }
        }
    });
}
export default { saveData, getData}
