const init = () => {
    const opendb = indexedDB.open("Melodia");
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("RecentMusicData");
        db.createObjectStore("TopMusicData");
        db.createObjectStore("DevData");
        db.createObjectStore("MusicData");
        db.createObjectStore("UserData");
        db.createObjectStore("AdminData");
    }
    return opendb;
}
const saveData = (data, objStore, init, key = 1) => {
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
const getData = (objStore, init, key = 1) => {
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

export default { saveData, getData, init }
