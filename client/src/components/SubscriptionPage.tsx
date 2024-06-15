import React, { useState } from 'react'
import { useGetSubscriptions } from '../hooks/apiHooks'
import LoadingScreen from './LoadingScreen';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Select from './Select';
import { Link } from 'react-router-dom';
import { formatDateString } from '../util';
export default function SubscriptionPage() {
    const { loading, subscriptions } = useGetSubscriptions();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    if (loading) {
        return (
            <LoadingScreen />
        )
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
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Subscription name</TableCell>
                            <TableCell>{`Duration (days)`}</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            subscriptions.map(st => {
                                return (
                                    <TableRow key={st.id}>
                                        <TableCell>
                                            {
                                                <Link to={`/books/${st.book.id}`}>
                                                    {st.book.name}
                                                </Link>
                                            }
                                        </TableCell>
                                        <TableCell>{st.name}</TableCell>
                                        <TableCell>{st.duration}</TableCell>
                                        <TableCell>{formatDateString(st.startTime)}</TableCell>
                                        <TableCell>{formatDateString(st.endTime)}</TableCell>
                                        <TableCell>{st.price}</TableCell>

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
