import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Books, Genre } from '../types';
import Select from './Select';

interface Props {
    genres: Genre[],
    books?: Books
}

export default function BookFilter(props: Props) {
    const [urlParams, setUrlParams] = useSearchParams()
    const numberOfPages = Math.ceil((props.books?.total || 1) / 10);
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2
        }}>
            <TextField sx={{
                flex: 1
            }} onChange={e => {
                urlParams.set('name', e.currentTarget.value)
                setUrlParams(urlParams)
            }} value={urlParams.get('name')} placeholder='Search...' />
            <Select
                placeholder='Genre'
                value={urlParams.get('genre_id')}
                onChange={val => {
                    urlParams.set('genre_id', val)
                    setUrlParams(urlParams)
                }}
                options={props.genres.map(genre => {
                    return {
                        value: genre.id + '',
                        label: genre.name
                    }
                })}
            />

            <IconButton onClick={() => {
                urlParams.set('page', `${(props.books?.page || 1) - 1}`)
                setUrlParams(urlParams)
            }} disabled={(props.books?.page || 1) <= 1}>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={() => {
                urlParams.set('page', `${(props.books?.page || 1) + 1}`)
                setUrlParams(urlParams)
            }} disabled={props.books?.page === numberOfPages}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    )
}
