import storage from './localStorage.js';
import indexedDB from './indexedDB.js';
import toBase64 from './base64';
import logo from '../public/logo.jpg';

const getAiImage = async (setImage) => {
    const data = await indexedDB.getData("AI_Image");
    setImage(data);
}

(async () => {
    const stored = storage.getValue("ai_image");
    if(!stored){
        const response = await fetch(logo);
        const blob = await response.blob()
        const data = await toBase64(blob);
        indexedDB.saveData(data, "AI_Image");
        storage.setValue("ai_image", true);
    }
})();

export default getAiImage