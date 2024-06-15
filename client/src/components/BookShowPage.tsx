import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, Container, Dialog, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useBookFile, useGetBook } from '../hooks/apiHooks';
import { SubscriptionType } from '../types';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';
export default function BookShowPage() {
    const { id } = useParams();
    const { book, loading } = useGetBook(Number(id));
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionType | undefined>(undefined);
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
    const onConfirm = async () => {
        if (!selectedSubscription) {
            return;
        }
        await axios.post(`/api/subscriptions`, { subscriptionTypeId: selectedSubscription.id });
        setSelectedSubscription(undefined);
    }
    return (
        <Container sx={{
            pt: 1,
            height: '100%',

        }}>
            <Dialog sx={{
                padding: 3
            }} open={selectedSubscription !== undefined} onClose={() => setSelectedSubscription(undefined)}>
                <Typography sx={{
                    borderBottom: 2,
                    padding: 2
                }} variant="h5" >
                    Confirm book order
                </Typography>
                <Box sx={{
                    padding: 2
                }}>
                    <Typography >
                        {` Book: ${book.name}`}
                    </Typography>
                    <Typography >
                        {`Subscription: ${selectedSubscription?.name}`}
                    </Typography>
                    <Typography >
                        {`Duration: ${selectedSubscription?.duration} days`}
                    </Typography>
                    <Typography >
                        {`Price: ${selectedSubscription?.price} USD`}
                    </Typography>
                </Box>
                <Box sx={{
                    padding: 2,
                    display: 'flex',
                }}>
                    <Button color='success' sx={{
                        flex: 1,
                    }} onClick={onConfirm}>Confirm</Button>
                    <Button color='secondary' sx={{
                        flex: 1,
                    }} onClick={() => setSelectedSubscription(undefined)}>Reject</Button>
                </Box>
            </Dialog>
            <Box sx={{
                height: '70%',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,

            }}>
                <Box sx={{
                    backgroundImage: `url('/api/books/${book.id}/preview')`,
                    backgroundSize: 'cover',
                    height: '90%',
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
                                                    <IconButton onClick={() => {
                                                        setSelectedSubscription(st)
                                                    }}>
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
