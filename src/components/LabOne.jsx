import React, {useEffect, useState} from 'react';
import {Button, Divider, FormControlLabel, FormGroup, Stack, Switch, TextField, Typography} from "@mui/material";
import {decode, encode} from "../helpers/labOne";
import {removeChars} from "../helpers/common";
import Title from "./common/Title";


const LabOne = () => {
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
    const [interactive, setInteractive] = useState(false);

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
        setResult(encode(source));
    }

    useEffect(()=>{
        if(source.length>0){
            shifr();
        }
        else setResult('')
    },[source])

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
            <Title text={'"Сказочный" алгоритм'}/>
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
                    onClick={()=>setResult(decode(result))}
                >Декодировать</Button>
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

export default LabOne;