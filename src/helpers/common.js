
export function getRandomNumbers(n){
    let numbers = [];
    let m = 3525;
    let a = 2;
    let c = 1283;
    let x = 7;
    for(let i=0;i<n;i++){
        x = (a * x + c) % m;
        numbers.push(x);
    }

    return numbers;
}

export function getGamma(n){
    let keys = getRandomNumbers(n);
    let result = [];
    for (let i = 0; i < keys.length; i++) {
        let x= keys[i]%31;
        if(x<1){
            x += 31;
        }
        result.push(String.fromCharCode(x+1039));
    }
    return result.join('');
}


export function sumLetterByKey(letter, keyItem){
    let letterCode = letter.charCodeAt(0)-1039;
    let keyCode = keyItem.charCodeAt(0)-1039;
    if(letterCode<1 || letterCode>32 || keyCode<1 || keyCode>32)  return letter;
    let resultCode = letterCode+keyCode;
    if(resultCode>31){
        resultCode = resultCode-31;
    }
    return String.fromCharCode(resultCode+1039);

}

export function subtractLetterByKey(letter, keyItem){
    let letterCode = letter.charCodeAt(0)-1039;
    let keyCode = keyItem.charCodeAt(0)-1039;
    if(letterCode<1 || letterCode>32 || keyCode<1 || keyCode>32)  return letter;
    let resultCode = letterCode-keyCode;
    if(resultCode<1){
        resultCode = resultCode+31;
    }
    return String.fromCharCode(resultCode+1039);

}


export function moveLetter(letter,k, left=false){
    let code = letter.charCodeAt(0);
    let code2 =code-1039;
    if(code>=1040 && code<=1071){
        if(!left){
            code2 = (code2+k+32)%32;
        }
        else{
            code2 = (code2-k+32)%32;
        }
    }

    code2 = code2===0?32:code2;
    return String.fromCharCode(code2+1039);
}

export function removeChars(s) {
    return s.replace(/[^a-zа-яё\s]/gi, '');
}

export function reverse(arr){
    let left = 0;
    let right = arr.length-1;
    while(left<right){
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr;
}

export function toWords(str,n){
    let words = [];
    for (let i = 0; i < str.length; i+=n) {
        words.push(str.substring(i,i+n));
    }
    return words;
}