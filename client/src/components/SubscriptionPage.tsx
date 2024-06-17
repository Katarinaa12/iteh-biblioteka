import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSubscriptions } from '../hooks/apiHooks';
import { useUserContext } from '../userContext';
import { formatDateString, generateCsvFileFromData } from '../util';
import LoadingScreen from './LoadingScreen';
import Select from './Select';
import { sub } from 'date-fns';
export default function SubscriptionPage() {
    const { user } = useUserContext();
    const { loading, subscriptions, setSubscriptions } = useGetSubscriptions();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const filtered = subscriptions
        .filter(subscription => {
            return (!name ||
                subscription.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
                subscription.book.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) &&
                (!status || subscription.status === status)
        })
    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    const changeStatus = async (subscriptionId: number, newStatus: string) => {

        const statusUrlMap = new Map([
            ['accepted', 'accept'],
            ['rejected', 'reject']
        ])
        const res = await axios.put(`/api/subscriptions/${subscriptionId}/${statusUrlMap.get(newStatus)}`);
        setSubscriptions(prev => {
            return prev.map(element => {
                if (element.id === subscriptionId) {
                    return res.data
                }
                return element;
            })
        })
    }
    return (
        <Container sx={{
            padding: 2
        }}>
            <Box sx={{
                paddingBottom: 2,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2
            }}>
                <TextField sx={{
                    flex: 1
                }} onChange={e => {
                    setName(e.currentTarget.value)
                }} value={name} placeholder='Search...' />
                <Select
                    placeholder='Status...'
                    value={status}
                    onChange={setStatus}
                    options={['pending', 'accepted', 'rejected'].map(val => {
                        return {
                            value: val,
                            label: val
                        }
                    })}
                />
                <Button variant='outlined' color='success' onClick={() => {
                    generateCsvFileFromData(filtered.map(subscription => {
                        return {
                            Id: subscription.id,
                            Name: subscription.name,
                            Duration: subscription.duration,
                            'Start Time': subscription.startTime,
                            'End Time': subscription.endTime,
                            Status: subscription.status,
                            Price: subscription.price,
                            User: subscription.user.name,
                            Book: subscription.book.name,
                        }
                    }), 'subscriptions')
                }} >Export</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Subscription name</TableCell>
                            <TableCell>{`Duration (days)`}</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Price</TableCell>
                            {
                                user?.admin && (
                                    <TableCell>Actions</TableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filtered
                                .map(st => {
                                    return (
                                        <TableRow key={st.id}>
                                            <TableCell>
                                                {
                                                    <Link to={`/books/${st.book.id}`}>
                                                        {st.book.name}
                                                    </Link>
                                                }
                                            </TableCell>
                                            <TableCell>{st.status}</TableCell>
                                            <TableCell>{st.name}</TableCell>
                                            <TableCell>{st.duration}</TableCell>
                                            {user?.admin && <TableCell>{st.user.name}</TableCell>}
                                            <TableCell>{formatDateString(st.startTime)}</TableCell>
                                            <TableCell>{formatDateString(st.endTime)}</TableCell>
                                            <TableCell>{st.price}</TableCell>
                                            {
                                                user?.admin && st.status === 'pending' && (
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Button variant='outlined' onClick={() => {
                                                            changeStatus(st.id, 'accepted')
                                                        }} color='success' sx={{
                                                            flex: 1,
                                                        }} >Accept</Button>
                                                        <Button variant='outlined' onClick={() => {
                                                            changeStatus(st.id, 'rejected')
                                                        }} color='error' sx={{
                                                            flex: 1,
                                                        }} >Reject</Button>
                                                    </Box>
                                                )
                                            }
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
