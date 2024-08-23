import indexedDB from './indexedDB.js';
import toBase64 from './base64';

const getAiImage = async (setImage) => {
    const data = await indexedDB.getData("AiImage");
    setImage(data);
}

(async () => {
    const data = await indexedDB.getData("AiImage");
    if(!data){
        const data = await toBase64('logo.jpg');
        indexedDB.saveData(data, "AiImage");
    }
})();

export default getAiImage