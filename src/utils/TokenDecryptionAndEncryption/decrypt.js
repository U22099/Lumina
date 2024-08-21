function decrypt(stringArr){
    let decryptedArr = [];
    stringArr.forEach( str => {
        const decodedChunk = [];
        for(let x = 0; x < str.length; x+=3){
            const index = parseInt(swap(`${str[x+1]}${str[x+2]}`), 10);
            decodedChunk[index] = str[x];
        }
        decryptedArr.push(decodedChunk.join(''));
    })
    return decryptedArr.join('');
}
function swap(str){
    return str.split('').reverse().join('');
}

export default decrypt;
