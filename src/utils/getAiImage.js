import storage from './localStorage.js';
import indexedDB from './indexedDB.js';
import toBase64 from './base64';
import axios from 'axios';

const getAiImage = async (setImage) => {
    const data = await indexedDB.getData("AI_Image");
    setImage(data);
}

(async () => {
    const stored = storage.getValue("ai_image");
    if(!stored){
        const response = await axios.get('logo.jpg', {responseType: 'arraybuffer'});
        const blobl = new Blob([response.data], {type: 'image/jpeg'});
        const data = await toBase64(blob);
        indexedDB.saveData(data, "AI_Image");
        storage.setValue("ai_image", true);
    }
})();

export default getAiImage