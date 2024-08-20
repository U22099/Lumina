function decrypt(str){
    const decryptedArr = new Array(Math.ceil(str.length / 3));
    for(let x = 0; x < str.length; x+=3){
        const index = parseInt(swap(`${str[x+1]}${str[x+2]}`), 10);
        decryptedArr[index] = str[x];
    }
    return decryptedArr.join('');
}
function swap(str){
    return str.split('').reverse().join('');
}

export default decrypt;