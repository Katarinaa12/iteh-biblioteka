import { Box, Container, TextField } from '@mui/material';
import { useGetGenres, useSearchBooks } from '../hooks/apiHooks';
import LoadingScreen from './LoadingScreen';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';
import BookItem from './BookItem';

export default function BookSearchPage() {
    const { books, loading } = useSearchBooks();
    const [urlParams, setUrlParams] = useSearchParams()
    const { genres } = useGetGenres()
    if (loading && !books) {
        return (
            <LoadingScreen />
        )
    }
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
                    setUrlParams({ name: e.currentTarget.value })
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
