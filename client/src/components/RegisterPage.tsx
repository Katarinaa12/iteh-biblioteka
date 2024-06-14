import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useUserContext } from '../userContext';

export default function RegisterPage() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })
    const { register } = useUserContext();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant='h4'>Login</Typography>
            <form onSubmit={async e => {
                e.preventDefault();
                try {
                    await register({
                        email: formState.email,
                        password: formState.password,
                        name: `${formState.firstName} ${formState.lastName}`
                    })
                    navigate('/')
                } catch (error) {
                    setError('User already exists')
                }
            }} onChange={e => {
                if (!e.target) {
                    return;
                }
                const target = e.target as any
                setFormState(prev => {
                    return {
                        ...prev,
                        [target.name]: target.value
                    }
                })
            }}>
                <TextField sx={{ mb: 2 }} fullWidth label='First Name' placeholder='First Name' name='firstName' />
                <TextField sx={{ mb: 2 }} fullWidth label='Last Name' placeholder='Last Name' name='lastName' />
                <TextField sx={{ mb: 2 }} fullWidth label='Email' type='email' placeholder='Email' name='email' />
                <TextField sx={{ mb: 2 }} fullWidth label='Password' type='password' placeholder='Password' name='password' />
                <Button type='submit' variant='contained' fullWidth>Register</Button>
                {
                    error && (
                        <Typography
                            sx={{
                                color: 'red',
                                mt: 2
                            }}
                        >{error}</Typography>
                    )
                }
            </form>
        </Box>
    )
}
