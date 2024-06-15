import { Box, Container } from '@mui/material';
import { useGetGenres, useSearchBooks } from '../hooks/apiHooks';
import BookFilter from './BookFilter';
import BookItem from './BookItem';
import LoadingScreen from './LoadingScreen';
export default function BookSearchPage() {
    const { books, loading } = useSearchBooks();
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
            <BookFilter genres={genres} books={books} />
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
