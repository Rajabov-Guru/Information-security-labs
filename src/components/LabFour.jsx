import React, {useEffect, useState} from 'react';
import {decode, encode} from "../helpers/labFour";
import {Button, FormControlLabel, FormGroup, Stack, Switch, TextField} from "@mui/material";
import Title from "./common/Title";
import StackRow from "./common/StackRow";

const LabFour = () => {
    const [source, setSource] = useState('');
    const [keyWord, setKeyWord] = useState('НЕБОСКРЕБ');
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
        setResult(encode(source,keyWord));
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
            <Title text={'Метод Вижинера'}/>
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
            <Stack alignItems={'center'}>
                <TextField
                    style={{width:'50%'}}
                    size={'small'}
                    id="outlined-multiline-flexible"
                    label="Ключ"
                    multiline
                    onChange={e=>setKeyWord(e.target.value.toUpperCase())}
                    value={keyWord}
                />
            </Stack>
            <StackRow>
                <Button onClick={()=>shifr()}>Зашифровать</Button>
                <Button onClick={()=>setResult(decode(result,keyWord))}>Расшифровать</Button>
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

export default LabFour;