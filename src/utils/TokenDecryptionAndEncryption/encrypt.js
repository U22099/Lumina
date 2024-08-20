import shuffle from './shuffle.js'

function encrypt(token){
    const chunkArr = [];
    const tokenArr = token.split('');
    const encryptedChunkArr = [];
    for(let x = 0; x < Math.ceil(tokenArr.length/100); x++){
        chunkArr.push(tokenArr.splice(100));
    }
    chunkArr.map(chunk => {
        let arr = [];
        for(let x = 0; x < chunk.length; x++){
            arr.push(`${token[x]}${swap(x)}`);
        }
        encryptedChunkArr.push(shuffle(arr).join(''));
    });
    console.log(encryptedChunkArr);
    return encryptedChunkArr;
}
function swap(no){
    let str = (no < 10) ? `0${no}` : `${no}`;
    return str.split('').reverse().join('');
}
export default encrypt