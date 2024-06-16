import React from 'react'
import { Genre } from '../../types'
import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import Select from '../Select'
import FileInput from './FileInput'

interface Props {
    genres: Genre[],
    open: boolean,
    onClose: () => void
}

export default function BookForm(props: Props) {
    return (
        <Dialog open={props.open} onClose={props.onClose} keepMounted>
            <Box sx={{
                width: '500px'
            }}>
                <Typography
                    variant='h5'
                    sx={{
                        padding: 2,
                        borderBottom: 1
                    }}
                >Create book form</Typography>
                <Box component='form' sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <TextField InputLabelProps={{ shrink: true }} fullWidth label='Name' placeholder='Name' />
                    <TextField InputLabelProps={{ shrink: true }} fullWidth label='ISBN' placeholder='ISBN' />
                    <TextField InputLabelProps={{ shrink: true }} fullWidth label='Writter' placeholder='Writter' />
                    <TextField InputLabelProps={{ shrink: true }} fullWidth type='number' label='Number of pages' placeholder='Number of pages' />
                    <TextField InputLabelProps={{ shrink: true }} fullWidth type='number' label='Published year' placeholder='Published year' />
                    <FileInput value='' label='Preview' onChange={val => { }} />
                    <FileInput value='' label='Content' onChange={val => { }} />
                    <Select value={''} fullWidth placeholder='Genre' onChange={(val) => { }} options={props.genres.map(genre => {
                        return {
                            value: genre.id,
                            label: genre.name
                        }
                    })} />
                    <TextField InputLabelProps={{ shrink: true }} fullWidth
                        label="Description"
                        placeholder="Description"
                        rows={4}
                        multiline
                    />
                    <Button variant='contained' color='primary' fullWidth type='submit'>Save book</Button>
                </Box>
            </Box>
        </Dialog>
    )
}
