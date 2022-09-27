import React, {useEffect, useState} from 'react';
import {
    Button,
    Divider,
    FormControlLabel,
    FormGroup,
    Stack,
    Switch,
    TextField,
} from "@mui/material";
import {decode, encode} from "../helpers/labTwo";
import Title from "./common/Title";


const M = 7;
const N = 5;
let w = Array.from({length:M},(item,index)=>
    '_____');

const getEmptyRows = (length)=>{
    return Array.from({length:M-length},
        ()=>Array.from({length:N},()=>'_').join(''));
}
const getEmptyCells = (length)=>{
    return Array.from({length:N-length},
        ()=>'_');
}


const LabTwo = () => {
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
    const [words, setWords] = useState([]);
    const [interactive, setInteractive] = useState(false);


    const getFile = async (e) => {
        e.preventDefault()
        const exampleFileReader = new FileReader()
        exampleFileReader.onload = async (e) => {
            const text = (e.target.result);
            setSource(text.toString().substring(0,48));
        };
        exampleFileReader.readAsText(e.target.files[0])
    }

    const shifr =()=>{
        const {str, words} = encode(source, M,N);
        setResult(str);
        setWords(words);
    }

    const deshifr =()=>{
        const str = decode(result,M,N);
        setResult(str)
    }

    useEffect(()=>{
        if(source.length>0){
            shifr();
        }
        else {
            setResult('');
            setWords([]);
        }
    },[source])

    useEffect(()=>{
        setSource('');
        setWords([]);
    },[interactive])

    const onSourceChange =(e)=>{
        if(interactive){
            setSource(e.target.value);
        }
    }
    return (
        <Stack spacing={3}>
            <Title text={'Шифр "СКИТАЛА"'}/>
            <Stack justifyContent={'flex-end'}
                   direction="row">
                <FormGroup>
                    <FormControlLabel control={
                        <Switch checked={interactive} onChange={e=>setInteractive(e.target.checked)} />
                    } label="Вручную" />
                </FormGroup>
            </Stack>
            <Button variant="contained" component="label" disabled={interactive}>
                Загрузить файл
                <input onChange={e=>getFile(e)} hidden accept=".txt" multiple type="file" />
            </Button>
            <Stack justifyContent={'space-between'}
                   direction="row"
                   divider={<Divider orientation="vertical" flexItem />}
                   spacing={2}>
                <Button
                    onClick={()=>shifr()}
                >Закодировать</Button>
                <Button
                    onClick={()=>deshifr()}
                >Декодировать</Button>
            </Stack>
            <Stack direction="row" justifyContent={'center'}>
                <table border={'1px solid black'} cellPadding={'5px'}>
                    <tbody>
                    {words.map(word=>
                        <tr>
                            {word.split('').map(letter=>
                                <td>{letter}</td>
                            )}
                            {getEmptyCells(word.length).map(letter=>
                                <td>{letter}</td>
                            )}
                        </tr>
                    )}
                    {getEmptyRows(words.length).map(item=>
                        <tr>
                            {item.split('').map(letter=>
                                <td>{letter}</td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </Stack>
            <Stack justifyContent={'space-between'}
                   direction="row"
                   divider={<Divider orientation="vertical" flexItem />}
                   spacing={2}>
                <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Исходный текст"
                    multiline
                    onChange={onSourceChange}
                    value={source}
                />

                <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Результат"
                    multiline
                    value={result}
                />
            </Stack>
        </Stack>
    );
};

export default LabTwo;