export function XOR(n1,n2){
    let result = [];
    for(let i=0;i<n1.length;i++){
        result.push(n1[i]^n2[i]);
    }
    return result.join('');
}

export function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export function NOD () {
    for (var x = arguments[0], i = 1; i < arguments.length; i++) {
        var y = arguments[i];
        while (x && y) {
            x > y ? x %= y : y %= x;
        }
        x += y;
    }
    return x;
}

export function euler(N){
    let result =[];
    let i = 0;
    let n = 2;
    while(n<N){
        if(NOD(N,n)===1){
            result.push(n);
            i++;
        }
        n++;
    }
    return result;
}



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
    return moveLetter(letter,keyCode);
}

export function subtractLetterByKey(letter, keyItem){
    let letterCode = letter.charCodeAt(0)-1039;
    let keyCode = keyItem.charCodeAt(0)-1039;
    if(letterCode<1 || letterCode>32 || keyCode<1 || keyCode>32)  return letter;
    return moveLetter(letter,keyCode, true);
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