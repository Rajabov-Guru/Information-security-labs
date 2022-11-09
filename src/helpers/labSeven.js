import {euler, randomInteger, removeChars, reverse} from "./common";

export function encode(text){
    let arr = removeChars(text).toUpperCase().split('');
    const p = 3;
    const q = 11;
    const n = p*q;
    const s = (p-1)*(q-1);
    const darr = euler(s);
    const d = darr[0];
    let e = 1;
    for (let i = 0; i <s*2 ; i++) {
        let com  = (i*d)%s;
        if(com===1) {
            e = i;
            break;
        }
    }
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let cd = arr[i].charCodeAt(0)-1039;
        result.push(Math.pow(cd,e)%n);
    }
    return `${d} ${result.join(' ')} ${n}`;

}

export function decode(text){
    let arr = text.split(' ');
    let d = Number(arr[0]);
    let n = Number(arr.pop());
    let result = [];
    for (let i = 1; i < arr.length; i++) {
        let cd = Math.pow(Number(arr[i]),d)%n;
        result.push(String.fromCharCode(cd+1039));
    }
    return result.join('');

}