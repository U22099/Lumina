import storage from './localStorage.js'
import encrypt from './TokenEncryptionAndDecryption/encrypt.js'
import decrypt from './TokenEncryptionAndDecryption/decrypt.js'

function getToken(name){
    const token = storage.getValue(name);

    const result = decrypt(token);
    return result;
}

function setToken(name, token){
    const result = encrypt(token);

    storage.setValue(name, result);
}
//for test
const text = 'This_is$test';
const encrypted = encrypt(text);
console.log('Encrypted: ',encrypted);
console.log('Decrypted: ',  decrypt(encrypted));

export default {getToken, setToken}