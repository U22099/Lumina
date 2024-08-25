import storage from './localStorage.js';
import indexedDB from './indexedDB.js';
import toBase64 from './base64';

const getAiImage = async (setImage, logo) => {

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

    const data = await indexedDB.getData("AI_Image");
    setImage(data);
}

export default getAiImage