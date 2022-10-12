import {removeChars, reverse, toWords} from "./common";

const m= 7;
const n =5;

export function runEncode(text, key){
    let arr = reverse(removeChars(text).toUpperCase().split(''));
    let step1 = arr.join('');


    let arr2 = step1.split('');
    if(key.length<arr2.length){
        key = key.repeat(Math.ceil(arr2.length/key.length)).substring(0,arr2.length);
    }
    let k = [];
    for (let i = 0; i < key.length; i++) {
        k.push(Number(key[i]));
    }

    for (let i = 0; i < arr2.length; i++) {
        let code1 = Number(arr2[i].charCodeAt(0))-1039;
        let code2 = code1 + k[1];
        if(code2>31){
            code2 = code2-31;
        }
        code2+=1039;
        arr2[i] = String.fromCharCode(Number(code2));
    }
    let step2 = arr2.join('');


    // step2 = step2.replace(/\s/g,'_');
    if(step2.length>m*n){
        step2 = step2.substring(0,m*n-1);
    }
    let words = toWords(step2,n);

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
    let step3 = shifrWords.join('')+String.fromCharCode(words.length+1039);

    return {
        step1,
        step2,
        step3
    }

}

export function runDecode(text, key){
    let tableKey = text[text.length-1].charCodeAt(0)-1039;
    let words = toWords(text.substring(0,text.length-1),tableKey);
    let shifrWords = new Array(m);
    for (let i = 0; i < tableKey; i++) {
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
    let step1 = shifrWords.join('').replace(/_/g,' ').trim();

    let arr2 = step1.split('');
    if(key.length<arr2.length){
        key = key.repeat(Math.ceil(arr2.length/key.length)).substring(0,arr2.length);
    }
    let k = [];
    for (let i = 0; i < key.length; i++) {
        k.push(Number(key[i]));
    }

    for (let i = 0; i < arr2.length; i++) {
        let code1 = Number(arr2[i].charCodeAt(0))-1039;
        let code2 = code1 - k[1];
        if(code2<1){
            code2 += 31;
        }
        code2+=1039;
        arr2[i] = String.fromCharCode(Number(code2));
    }
    let step2 = arr2.join('');

    let arr = reverse(removeChars(step2).toUpperCase().split(''));
    let step3 = arr.join('');

    return {
        step1,
        step2,
        step3
    }
}