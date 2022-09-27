import {subtractLetterByKey, sumLetterByKey} from "./common";


export function encode(text,key){
    let arr = text.toUpperCase().split('');
    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] =sumLetterByKey(arr[i], key[i])
    }

    return arr.join('');

}

export function decode(text,key){
    let arr = text.toUpperCase().split('');
    if(key.length<arr.length){
        key = key.repeat(Math.ceil(arr.length/key.length)).substring(0,arr.length);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] =subtractLetterByKey(arr[i], key[i])
    }

    return arr.join('');

}