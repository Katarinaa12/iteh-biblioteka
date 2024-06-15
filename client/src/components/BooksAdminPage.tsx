import { Container } from '@mui/material';
import { useGetGenres, useSearchBooks } from '../hooks/apiHooks';
import BookFilter from './BookFilter';
import LoadingScreen from './LoadingScreen';

export default function BooksAdminPage() {
    const { genres } = useGetGenres()
    const { books, loading } = useSearchBooks();
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
        </Container>
    )
}
