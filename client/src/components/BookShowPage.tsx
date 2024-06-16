import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, Container, Dialog, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useBookFile, useGetBook } from '../hooks/apiHooks';
import { SubscriptionType } from '../types';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';
import { useUserContext } from '../userContext';
import SubscriptionTypeForm from './form/SubscriptionTypeForm';
export default function BookShowPage() {
    const { id } = useParams();
    const { user } = useUserContext();
    const { book, loading, setBook } = useGetBook(Number(id));
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionType | undefined>(undefined);
    const [openForm, setOpenForm] = useState(false);
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
            {
                user?.admin && <SubscriptionTypeForm
                    open={openForm}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedSubscription(undefined);
                    }}
                    subscriptionType={selectedSubscription}
                    onSubmit={async val => {
                        if (!selectedSubscription) {
                            const res = await axios.post(`/api/books/${id}/subscription-types`, val);
                            setBook(prev => {
                                if (!prev) {
                                    return prev;
                                }
                                return {
                                    ...prev,
                                    subscriptionTypes: [...prev?.subscriptionTypes, res.data]
                                }
                            })
                        } else {
                            const res = await axios.put(`/api/books/${id}/subscription-types/` + selectedSubscription.id, val);
                            setBook(prev => {
                                if (!prev) {
                                    return prev;
                                }
                                return {
                                    ...prev,
                                    subscriptionTypes: prev.subscriptionTypes.map(element => {
                                        if (element === selectedSubscription) {
                                            return res.data;
                                        }
                                        return element;
                                    })
                                }
                            })
                        }
                        setOpenForm(false);
                        setSelectedSubscription(undefined);
                    }}
                />
            }
            {
                !user?.admin && <Dialog sx={{
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
            }
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
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: 2
                    }}>
                        <Typography
                            variant='h6'
                        >Subscription types</Typography>
                        {
                            user?.admin && (
                                <Button onClick={() => {
                                    setOpenForm(true);
                                }} variant='outlined' color='primary' >Create</Button>
                            )
                        }
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{`Duration (days)`}</TableCell>
                                    <TableCell>Price</TableCell>
                                    {user && <TableCell>{user.admin ? 'Actions' : 'Buy'}</TableCell>}
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
                                                {
                                                    user && (
                                                        <TableCell>
                                                            {
                                                                user.admin ? (
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Button onClick={() => {
                                                                            setOpenForm(true);
                                                                            setSelectedSubscription(st)
                                                                        }} variant='outlined' color='success' sx={{
                                                                            flex: 1,
                                                                        }} >Update</Button>
                                                                        <Button onClick={async () => {
                                                                            await axios.delete(`/api/books/${id}/subscription-types/` + st.id);
                                                                            setBook(prev => {
                                                                                if (!prev) {
                                                                                    return prev;
                                                                                }
                                                                                return {
                                                                                    ...prev,
                                                                                    subscriptionTypes: prev.subscriptionTypes.filter(val => val !== st)
                                                                                }
                                                                            })
                                                                        }} variant='outlined' color='error' sx={{
                                                                            flex: 1,
                                                                        }} >Delete</Button>
                                                                    </Box>
                                                                ) : (
                                                                    <IconButton onClick={() => {
                                                                        setSelectedSubscription(st)
                                                                    }}>
                                                                        <PaymentsIcon />
                                                                    </IconButton>
                                                                )
                                                            }
                                                        </TableCell>
                                                    )
                                                }

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
