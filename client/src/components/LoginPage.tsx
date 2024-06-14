import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUserContext } from '../userContext'
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const { login } = useUserContext();
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
                    await login(formState.email, formState.password)
                    navigate('/')
                } catch (error) {
                    setError('Invalid email or password')
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
                <TextField sx={{ mb: 2 }} fullWidth label='Email' type='email' placeholder='Email' name='email' />
                <TextField sx={{ mb: 2 }} fullWidth label='Password' type='password' placeholder='Password' name='password' />
                <Button type='submit' variant='contained' fullWidth>Login</Button>
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
