import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useGetGenres, useSearchBooks } from '../hooks/apiHooks';
import BookFilter from './BookFilter';
import LoadingScreen from './LoadingScreen'; import { Link } from 'react-router-dom';
import BookForm from './form/BookForm';
import { useState } from 'react';
import axios from 'axios';
import { Book } from '../types';


export default function BooksAdminPage() {
    const { genres } = useGetGenres()
    const [openForm, setOpenForm] = useState(false);
    const { books, loading, fetchBooks } = useSearchBooks();
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
    if (loading && !books) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <Container sx={{
            padding: 2
        }}>
            <BookForm book={selectedBook} onSubmit={async book => {
                if (selectedBook) {
                    await axios.put('/api/books/' + selectedBook.id, book);
                } else {
                    await axios.post('/api/books', book);
                }
                setOpenForm(false);
                setSelectedBook(undefined);
                await fetchBooks();
            }} genres={genres} open={openForm} onClose={() => {
                setOpenForm(false);
            }} />
            <BookFilter genres={genres} books={books} />
            <Box sx={{
                paddingTop: 2,
                paddingBottom: 2
            }}>
                <Button onClick={() => {
                    setOpenForm(true)
                }} variant='outlined' color='primary' >Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Writter</TableCell>
                            <TableCell>ISBN </TableCell>
                            <TableCell>Release year</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Pages</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (books?.data || [])
                                .map(book => {
                                    return (
                                        <TableRow key={book.id}>
                                            <TableCell>
                                                <Link to={`/books/${book.id}`}>
                                                    {book.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{book.name}</TableCell>
                                            <TableCell>{book.writter}</TableCell>
                                            <TableCell>{book.isbn}</TableCell>
                                            <TableCell>{book.publishedYear}</TableCell>
                                            <TableCell>{book.genre.name}</TableCell>
                                            <TableCell>{book.pages}</TableCell>
                                            <TableCell>{book.description}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Button onClick={() => {
                                                        setSelectedBook(book);
                                                        setOpenForm(true);
                                                    }} variant='outlined' color='success' sx={{
                                                        flex: 1,
                                                    }} >Update</Button>
                                                    <Button onClick={async () => {
                                                        await axios.delete('/api/books/' + book.id);
                                                        fetchBooks();
                                                    }} variant='outlined' color='error' sx={{
                                                        flex: 1,
                                                    }} >Delete</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
