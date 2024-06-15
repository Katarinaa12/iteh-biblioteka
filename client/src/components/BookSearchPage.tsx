import { Box, Container, IconButton, TextField } from '@mui/material';
import { useGetGenres, useSearchBooks } from '../hooks/apiHooks';
import LoadingScreen from './LoadingScreen';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';
import BookItem from './BookItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function BookSearchPage() {
    const { books, loading } = useSearchBooks();
    const [urlParams, setUrlParams] = useSearchParams()
    const { genres } = useGetGenres()
    if (loading && !books) {
        return (
            <LoadingScreen />
        )
    }
    const numberOfPages = Math.ceil((books?.total || 1) / 10);
    return (
        <Container sx={{
            padding: 2
        }}>
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
                    options={genres.map(genre => {
                        return {
                            value: genre.id + '',
                            label: genre.name
                        }
                    })}
                />

                <IconButton onClick={() => {
                    urlParams.set('page', `${(books?.page || 1) - 1}`)
                    setUrlParams(urlParams)
                }} disabled={(books?.page || 1) <= 1}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton onClick={() => {
                    urlParams.set('page', `${(books?.page || 1) + 1}`)
                    setUrlParams(urlParams)
                }} disabled={books?.page === numberOfPages}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box>
                {
                    books?.data.map(book => {
                        return (
                            <BookItem key={book.id} book={book} />
                        )
                    })
                }
            </Box>
        </Container>
    )
}
