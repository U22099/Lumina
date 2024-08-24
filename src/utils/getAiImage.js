import storage from './localStorage.js';
import toBase64 from './base64';

const getAiImage = (setImage) => {
    const data = storage.getValue("ai_image");
    setImage(data);
}

(async () => {
    const stored = storage.getValue("ai_image");
    if(!stored){
        const data = await toBase64('logo.jpg');
        storage.setValue("ai_image", data);
    }
})();

export default getAiImage