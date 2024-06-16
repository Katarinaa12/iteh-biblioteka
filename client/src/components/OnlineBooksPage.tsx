import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, TextField, Container, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useOnlineBooks } from '../hooks/apiHooks';
import axios from 'axios';
export default function OnlineBooksPage() {
    const [urlParams, setUrlParams] = useSearchParams()
    const { books } = useOnlineBooks();
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
                    urlParams.set('search', e.currentTarget.value)
                    setUrlParams(urlParams)
                }} value={urlParams.get('search')} placeholder='Search...' />

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
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Writter</TableCell>
                            <TableCell>Release year</TableCell>
                            <TableCell>Average rating</TableCell>
                            <TableCell>Pages</TableCell>
                            <TableCell>Language</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (books?.books || [])
                                .map(book => {
                                    return (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.title}</TableCell>
                                            <TableCell>{(book.author_name || []).join(', ')}</TableCell>
                                            <TableCell>{book.first_publish_year}</TableCell>
                                            <TableCell>{book.ratings_average}</TableCell>
                                            <TableCell>{book.number_of_pages_median}</TableCell>
                                            <TableCell>{(book.language || []).join(', ')}</TableCell>
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
