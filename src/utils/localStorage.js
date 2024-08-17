function init(){
    const lumina = {
        user_stored: false,
        chat_stored: false,
        logged: false
    }
    localStorage.setItem("Lumina", JSON.stringify(lumina));
}
function getValue(key){
    const lumina = JSON.parse(localStorage.getItem("Lumina"));
    let result;
    switch(key){
        case "user_stored":
            result = lumina.user_stored;
            break;
        case "chat_stored":
            result = lumina.chat_stored;
            break;
        case "logged":
            result = lumina.logged;
            break;
    }
    return result;
}
function setValue(key, value){
    const lumina = JSON.parse(localStorage.getItem("Lumina"));
    switch(key){
        case "user_stored":
            lumina.user_stored = value;
            break;
        case "chat_stored":
            lumina.chat_stored = value;
            break;
        case "logged":
            lumina.logged = value;
            break;
    }

    localStorage.setItem("Lumina", JSON.stringify(lumina));
}
init();

module.exports = {getValue, setValue}