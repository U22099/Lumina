import shuffle from './shuffle.js'

function encrypt(token){
    const arr = token.split('');
    let arrIndex = [], joinedArr = [],encrypted = '';
    for(let x = 0; x < arr.length; x++){
        arrIndex.push(swap(x));
    }
    for(let x = 0; x < arr.length; x++){
        joinedArr.push(`${arr[x]}${arrIndex[x]}`);
    }
    encrypted = shuffle(joinedArr).join('');
    return encrypted;
}
function swap(no){
    let str = '';
    
    if(no < 10){
        str = `0${no}`;
    } else {
        str =   `${no}`;
    }
    return str.split('').reverse().join('');
}
export default encrypt