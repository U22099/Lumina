function init(){

    const lumina = JSON.parse(localStorage.getItem("Lumina")) || {
		ai_image: false,
        user_stored: false,
        chat_stored: false,
        logged: false,
        __R: '',
        __A: ''
    }
    localStorage.setItem("Lumina", JSON.stringify(lumina));
}
function getValue(key){
    const lumina = JSON.parse(localStorage.getItem("Lumina"));
    let result;
    switch(key){
		  case "ai_image":
            result = lumina.ai_image;
            break;
        case "user_stored":
            result = lumina.user_stored;
            break;
        case "chat_stored":
            result = lumina.chat_stored;
            break;
        case "logged":
            result = lumina.logged;
            break;
        case "__R":
            result = lumina.__R;
            break;
        case "__A":
            result = lumina.__A;
            break;
    }
    return result;
}
function setValue(key, value){
    const lumina = JSON.parse(localStorage.getItem("Lumina"));
    switch(key){
		  case "ai_image":
            lumina.ai_image = value;
            break;
        case "user_stored":
            lumina.user_stored = value;
            break;
        case "chat_stored":
            lumina.chat_stored = value;
            break;
        case "logged":
            lumina.logged = value;
            break;
        case "__R":
            lumina.__R = value;
            break;
        case "__A":
            lumina.__A = value;
            break;
    }

    localStorage.setItem("Lumina", JSON.stringify(lumina));
}

init();

export default {getValue, setValue}