import {removeChars, reverse, toWords} from "./common";

export function encode(text, m,n){
    let arr = removeChars(text).toUpperCase().split('');
    let str = arr.join('');
    str = str.replace(/\s/g,'');
    // if(str.length>m*n){
    //     str = str.substring(0,m*n-1);
    // }
    let words = toWords(str,n);

    let shifrWords = new Array(m);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < words.length; j++) {
            if(words[j] && i<words[j].length) {
                if(shifrWords[i]) shifrWords[i] += words[j][i];
                else shifrWords[i] = words[j][i];
            }
            else {
                if(shifrWords[i]) shifrWords[i] += '_';
                else shifrWords[i] = '_';
            }
        }
    }
    str = shifrWords.join('')+String.fromCharCode(words.length+1039);

    return {
        str:str,
        words:words,
    }
}

export function decode(text,m,n){
    let key = text[text.length-1].charCodeAt(0)-1039;
    let words = toWords(text.substring(0,text.length-1),key);
    let shifrWords = new Array(m);
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < n; j++) {
            if(words[j] && i<words[j].length) {
                if(shifrWords[i]) shifrWords[i] += words[j][i];
                else shifrWords[i] = words[j][i];
            }
            else {
                if(shifrWords[i]) shifrWords[i] += '_';
                else shifrWords[i] = '_';
            }
        }
    }
    let str = shifrWords.join('').replace(/_/g,' ').trim();
    return str;
}