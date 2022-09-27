
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


export function moveLetter(letter, left=false){
    let code = letter.charCodeAt(0);
    let code2 =code;
    if(code>=1040 && code<=1071){
        if(!left){
            if(code===1071){
                code2 = 1040;
            }else code2 ++;
        }
        else{
            if(code===1040){
                code2 = 1071;
            }else code2 --;
        }
    }
    return String.fromCharCode(code2);
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