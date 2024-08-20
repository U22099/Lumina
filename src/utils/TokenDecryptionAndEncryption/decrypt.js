function decrypt(str){
    const arr = str.split('');
    let decryptedArr = [];
    for(let x = 0; x < arr.length; x+=3){
        const index = parseInt(swap(`${arr[x+1]}${arr[x+2]}`));
        decryptedArr[index] = arr[x];
    }
    return decryptedArr.join('');
}
function swap(str){
    return str.split('').reverse().join('');
}

export default decrypt;