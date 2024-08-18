function shuffle(arr){
    let i = arr.length;
    while(--i > 0){
        const x = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[x]] = [arr[x], arr[i]];
    }
    return arr;
}

export default shuffle