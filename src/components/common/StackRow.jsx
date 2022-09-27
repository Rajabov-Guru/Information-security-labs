import React from 'react';
import {Divider, Stack} from "@mui/material";

const StackRow = ({children}) => {
    return (
        <Stack justifyContent={'space-between'}
               direction="row"
               divider={<Divider orientation="vertical" flexItem />}
               spacing={2}>
            {children}
        </Stack>
    );
};

export default StackRow;