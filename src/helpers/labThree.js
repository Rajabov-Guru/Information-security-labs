import {moveLetter} from "./common";

export function encode(text){
    let arr = text.toUpperCase().split('');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = moveLetter(arr[i]);
    }
    return arr.join('');
}

export function decode(text){
    let arr = text.toUpperCase().split('');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = moveLetter(arr[i], true);
    }
    return arr.join('');
}