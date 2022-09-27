import {removeChars, reverse, toWords} from "./common";

export function encode(text){
    let arr = reverse(removeChars(text).toUpperCase().split(''));
    let str = arr.join('');
    str = str.replace(/\s/g,'');
    let words = toWords(str,4);

    return words.join('\n');
}

export function decode(text){
    let str = reverse(text.split(''));
    return  str.join('');
}