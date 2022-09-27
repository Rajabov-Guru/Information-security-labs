import React from 'react';
import {Divider, Stack, Typography} from "@mui/material";

const Title = ({text}) => {
    return (
        <Stack>
            <Typography fontWeight={'bold'} textAlign={'center'} variant="h5" component="h2">
                {text}
            </Typography>
            <Divider/>
        </Stack>
    );
};

export default Title;