import {removeChars, subtractLetterByKey, sumLetterByKey, toWords} from "./common";


export function encode(text,key){
    let arr = removeChars(text).toUpperCase().split('');
    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] =sumLetterByKey(arr[i], key[i]);
    }

    let firstPart = key.substring(0,Math.floor(key.length/2));
    let secondPart = key.substring(firstPart.length);
    let Result = toWords(arr.join(''),4).join('\n');
    return `${firstPart}\n${Result}\n${secondPart}${String.fromCharCode(key.length+1039)}`;

}

export function decode(text,key){
    let arr = text.toUpperCase().split('\n').join('').split('');
    let keyLength = arr[arr.length-1].charCodeAt(0)-1039;
    arr.pop();
    let firstPart = arr.join('').substring(0,Math.floor(keyLength/2));
    let actualText = '';
    for (let i = firstPart.length; i < firstPart.length+arr.length-keyLength; i++) {
        actualText+=arr[i];
    }
    let secondPart = arr.join('').substring(firstPart.length+(actualText.length));
    // console.log(`${arr.length} ${keyLength} ${actualText} ${firstPart} ${secondPart}`);
    key = firstPart+secondPart;
    arr = actualText.split('');
    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] =subtractLetterByKey(arr[i], key[i])
    }

    return toWords(arr.join(''),4).join('\n');

}