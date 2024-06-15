import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useBookFile, useGetBook } from '../hooks/apiHooks';
import LoadingScreen from './LoadingScreen';
import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
export default function BookShowPage() {
    const { id } = useParams();
    const { book, loading } = useGetBook(Number(id));
    const navigate = useNavigate();
    const { fileUrl } = useBookFile(book);
    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    if (!book) {
        navigate('/books');
        return null;
    }
    return (
        <Container sx={{
            pt: 1,
            height: '100%',

        }}>
            <Box sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,

            }}>
                <Box sx={{
                    backgroundImage: `url('/api/books/${book.id}/preview')`,
                    backgroundSize: 'cover',
                    height: '80%',
                    flexBasis: '30%'
                }} />
                <Box sx={{
                    flex: 1,
                    padding: 3
                }}>

                    <Typography
                        variant='h4'
                    >{book.name}</Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            fontStyle: 'italic'
                        }}
                    >{book.writter}</Typography>
                    <Typography
                        variant='subtitle1'
                    >ISBN:{book.isbn}</Typography>
                    <Typography
                    >Genre:{book.genre.name}</Typography>
                    <Typography
                    >Pages:{book.pages}</Typography>
                    <Typography
                    >Published year:{book.publishedYear}</Typography>
                    <Typography
                    >Description</Typography>
                    <Typography
                        variant='body2'
                    >{book.description}</Typography>
                </Box>
                <Box sx={{
                    flex: 1,
                    padding: 3
                }}>
                    <Typography
                        variant='h6'
                    >Subscription types</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{`Duration (days)`}</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Buy</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    book.subscriptionTypes.map(st => {
                                        return (
                                            <TableRow key={st.id}>
                                                <TableCell>{st.name}</TableCell>
                                                <TableCell>{st.duration}</TableCell>
                                                <TableCell>{st.price}</TableCell>
                                                <TableCell>
                                                    <IconButton >
                                                        <PaymentsIcon />
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Box>
            </Box>
            {
                fileUrl && (
                    <embed src={fileUrl} width="100%" height="700px" />
                )
            }
        </Container>
    )
}
