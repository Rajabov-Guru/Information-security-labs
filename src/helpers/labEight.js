import {removeChars, XOR} from "./common";

export function getHash(text,p,q){
    let n = p*q;
    let arr = removeChars(text).toUpperCase().split('');
    let codes = [];
    let binaryCodes = [];
    let M = [];
    for(let i=0;i<arr.length;i++){
        let asc = arr[i].charCodeAt();
        codes.push(asc);
        let bin = asc.toString(2);
        if(bin.length%2!==0) bin = `0${bin}`;
        binaryCodes.push(bin);
        let mLength = bin.length/2;
        let m1 = `${'1'.repeat(mLength)}${bin.substring(0,mLength)}`;
        let m2 = `${'1'.repeat(mLength)}${bin.substring(mLength)}`;
        M.push(m1);
        M.push(m2);
    }
    let H = '0'.repeat(M[0].length);
    for(let i = 0;i<M.length;i++){
        let res = XOR(M[i],H);
        let intVal = parseInt(res,2);
        let kop = (intVal**2)%n;
        H = kop.toString(2);
        if(H.length%2!==0) H = `0${H}`;
    }


    return parseInt(H,2);
}