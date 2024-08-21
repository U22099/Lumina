import shuffle from './shuffle.js'

function encrypt(token){
    const chunkArr = [];
    const tokenArr = token.split('');
    const encryptedChunkArr = [];
    for(let x = 0; x < Math.ceil(token.length/100); x++){
        chunkArr.push(tokenArr.splice(0, 100));
    }
    console.log(chunkArr);
    chunkArr.forEach(chunk => {
        let arr = [];
        for(let x = 0; x < chunk.length; x++){
            arr.push(`${chunk[x]}${swap(x)}`);
        }
        encryptedChunkArr.push(shuffle(arr).join(''));
    });
    return encryptedChunkArr;
}
function swap(no){
    let str = (no < 10) ? `0${no}` : `${no}`;
    return str.split('').reverse().join('');
}
export default encrypt
