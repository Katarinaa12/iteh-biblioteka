import { Box, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react'
import axios from 'axios';

interface Props {
    value: string,
    onChange: (val: string) => void,
    label: string
}
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileInput(props: Props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <TextField value={props.value} disabled label={props.label} InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
            />
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput onChange={async e => {
                    const files = e.currentTarget.files;
                    if (!files) {
                        return;
                    }
                    const formData = new FormData();
                    formData.set('file', files[0]);
                    const res = await axios.post('/api/upload', formData);
                    props.onChange(res.data.fileName);
                }} type="file" />
            </Button>
        </Box>
    )
}
