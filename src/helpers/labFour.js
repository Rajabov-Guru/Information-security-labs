import {removeChars, subtractLetterByKey, sumLetterByKey, toWords} from "./common";


export function encode(text,key){
    let arr = removeChars(text).toUpperCase().split('');
    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }
    let actualKey = '';
    for (let i = 0; i < arr.length; i++) {
        arr[i] =sumLetterByKey(arr[i], key[i]);
        actualKey += key[i];
    }

    let firstPart = actualKey.substring(0,Math.floor(actualKey.length/2));
    let secondPart = actualKey.substring(firstPart.length);
    let Result = toWords(arr.join(''),4).join('\n');
    return `${firstPart}\n${Result}\n${secondPart}${String.fromCharCode(actualKey.length+1039)}`;

}

export function decode(text,key){
    let keyLength = text[text.length-1].charCodeAt(0)-1039;
    let arr = text.toUpperCase().split('\n').join('').split('');
    let firstPart = text.substring(0,Math.floor(keyLength/2));
    let secondPart = text.substring(text.length-(keyLength-firstPart.length-1));
    console.log(`${firstPart} ${secondPart}`)

    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] =subtractLetterByKey(arr[i], key[i])
    }

    return toWords(arr.join(''),4).join('\n');

}