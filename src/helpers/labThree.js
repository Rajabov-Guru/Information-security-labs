import {moveLetter, removeChars} from "./common";

export function encode(text,key){
    let arr = removeChars(text).toUpperCase().split('');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = moveLetter(arr[i],key);
    }
    return arr.join('');
}

export function decode(text,key){
    let arr = text.toUpperCase().split('');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = moveLetter(arr[i],key, true);
    }
    return arr.join('');
}