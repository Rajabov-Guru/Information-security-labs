import React, {useEffect, useState} from 'react';
import {Button, FormControlLabel, FormGroup, Stack, Switch, TextField} from "@mui/material";
import Title from "./common/Title";
import StackRow from "./common/StackRow";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {runDecode, runEncode} from "../helpers/labSix";

const LabSix = () => {
    const [downloadRef, setRef] = useState('#');
    const [mode, setMode] =useState('encode');
    const [source, setSource] = useState('');
    const [keyWord, setKeyWord] = useState('2718');
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

    const shifr =()=>{
        let {step1,step2,step3} = runEncode(source,keyWord);
        setResult(step3);
        console.log(step1);
        console.log(step2);
        console.log(step3);
        let type = `data:text/plain;content-disposition=attachment;filename=Result.txt,${step3}`;
        setRef(type);
    }

    const deshifr =()=>{
        let {step1,step2,step3} = runDecode(source,keyWord);
        setResult(step3);
        console.log(step1);
        console.log(step2);
        console.log(step3);
        let type = `data:text/plain;content-disposition=attachment;filename=Result.txt,${step3}`;
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
            <Title text={'Стандарт DES'}/>
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
                <TextField
                    style={{width:'50%'}}
                    size={'small'}
                    id="outlined-multiline-flexible"
                    label="Ключ"
                    multiline
                    onChange={e=>setKeyWord(e.target.value.toUpperCase())}
                    value={keyWord}
                />
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

export default LabSix;