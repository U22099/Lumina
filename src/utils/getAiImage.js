import storage from './localStorage.js';
import indexedDB from './indexedDB.js';

const getAiImage = async (setImage) => {

(async () => {
    const stored = storage.getValue("ai_image");
    if(!stored){
        const data = '';
        indexedDB.saveData(data, "AI_Image");
        storage.setValue("ai_image", true);
    }
})();

    const data = await indexedDB.getData("AI_Image");
    setImage(data);
}

export default getAiImage