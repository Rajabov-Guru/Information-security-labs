import React, {useEffect, useState} from 'react';
import {decode, encode} from "../helpers/labFive";
import {Button, FormControlLabel, FormGroup, Stack, Switch, TextField} from "@mui/material";
import Title from "./common/Title";
import StackRow from "./common/StackRow";
import {getGamma} from "../helpers/common";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";

const LabFive = () => {
    const [mode, setMode] =useState('encode');
    const [source, setSource] = useState('');
    const [keyWord, setKeyWord] = useState('');
    const [result, setResult] = useState('');
    const [interactive, setInteractive] = useState(false);

    const modeChange = (event, m) => {
        setMode(m);
        if (!interactive)setSource('');
    };

    useEffect(()=>{
        setKeyWord(getGamma(45));
    },[])

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
        setResult(encode(source,keyWord));
    }

    useEffect(()=>{
        if(source.length>0){
            mode==='encode'?shifr():setResult(decode(source,keyWord));
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
            <Title text={'Метод гаммирования'}/>
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
                    disabled
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
        </Stack>
    );
};

export default LabFive;