import {getHash} from "./labEight";
import {encode} from "./labSeven";

export function elSign(source){
    let str = getHash(source,17,19).toString();
    console.log(str);
    let text = "";
    for(let i=0;i<str.length;i++){
        let code = (Number(str[i]))+1;
        let letter = String.fromCharCode(code+1039);
        text+=letter;
    }
    let res = encode(text);
    return res;
}

export function checkSign(source){
    let arr = source.split(" | ");

    const sign = arr[0];
    const text = arr[1];
    console.log(sign);
    console.log(text);

    const sign2 = elSign(text);
    console.log(sign2);
    return sign === sign2
}