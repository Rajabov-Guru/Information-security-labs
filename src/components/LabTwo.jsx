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
import StackRow from "./common/StackRow";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";


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

const ShifrTable = ({words})=>{
    return(
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
            {/*{getEmptyRows(words.length).map(item=>*/}
            {/*    <tr>*/}
            {/*        {item.split('').map(letter=>*/}
            {/*            <td>{letter}</td>*/}
            {/*        )}*/}
            {/*    </tr>*/}
            {/*)}*/}
            </tbody>
        </table>
    );
}


const LabTwo = () => {
    const [mode, setMode] =useState('encode');
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
    const [words, setWords] = useState([]);
    const [interactive, setInteractive] = useState(false);

    const modeChange = (event, m) => {
        setMode(m);
        if (!interactive)setSource('');
    };


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
        const str = decode(source,M,N);
        setResult(str)
    }

    useEffect(()=>{
        if(source.length>0){
            mode==='encode'?shifr():deshifr();
        }
        else {
            setResult('');
            setWords([]);
        }
    },[source, mode])

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
            <StackRow>
                <Button variant="contained" component="label" disabled={interactive}>
                    Загрузить файл
                    <input onChange={e=>getFile(e)} hidden accept=".txt" multiple type="file" />
                </Button>
                <ToggleButtonGroup
                    color="primary"
                    value={mode}
                    exclusive
                    onChange={modeChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="encode">Шифровка</ToggleButton>
                    <ToggleButton value="decode">Дешифровка</ToggleButton>
                </ToggleButtonGroup>
            </StackRow>
            <Stack direction="row" justifyContent={'center'}>
                <ShifrTable words={words}/>
            </Stack>
            <StackRow>
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
            </StackRow>
        </Stack>
    );
};

export default LabTwo;