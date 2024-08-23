import indexedDB from './indexedDB.js';
import base64 from './base64';

const getAiImage= () => {
    const data = await indexedDB.getData("AiImage");
    return data
}

(async () => {
    const data = await indexedDB.getData("AiImage");
    if(!data){
        const data = await base64('logo.jpg');
        indexedDB.saveData(data, "AiImage");
    }
})();

export default getAiImage