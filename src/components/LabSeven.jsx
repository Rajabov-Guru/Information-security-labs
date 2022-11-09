import React, {useEffect, useState} from 'react';
import {Button, FormControlLabel, FormGroup, Stack, Switch, TextField} from "@mui/material";
import {decode, encode} from "../helpers/labSeven";
import Title from "./common/Title";
import StackRow from "./common/StackRow";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";


const LabSeven = () => {
    const [downloadRef, setRef] = useState('#');
    const [mode, setMode] =useState('encode');
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
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
            setSource(text.toString().substring(0,118));
        };
        exampleFileReader.readAsText(e.target.files[0])
    }

    const deshifr =()=>{
        const text = decode(source);
        setResult(text);
        let type = `data:text/plain;content-disposition=attachment;filename=Result.txt,${text}`;
        setRef(type);
    }

    const shifr =()=>{
        const text = encode(source);
        setResult(text);
        let type = `data:text/plain;content-disposition=attachment;filename=Result.txt,${text}`;
        setRef(type);
    }

    useEffect(()=>{
        if(source.length>0){
            mode==='encode'?shifr():deshifr();
        }
        else setResult('')
    },[source,mode])

    useEffect(()=>{
        setSource('');
    },[interactive])

    const onSourceChange =(e)=>{
        if(interactive){
            setSource(e.target.value);
        }
    }

    return (
        <Stack spacing={3}>
            <Title text={'Метод RSA'}/>
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
            <a download={'Result.txt'} id={'test'} href={downloadRef}>Скачать</a>
        </Stack>
    );
};

export default LabSeven;