import { Box, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router';

export default function HomePage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    return (
        <div className='search'>

            <Container sx={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'

            }}>


            </Container>
            <Box
                sx={{
                    mt: 3,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant='h3'
                >
                    Search books
                </Typography>
                <form className='searchForm' onSubmit={e => {
                    e.preventDefault();
                    navigate('/books?name=' + search)
                }} >
                    <TextField placeholder='Search...' fullWidth value={search} onChange={e => setSearch(e.currentTarget.value)} ></TextField>
                </form>
            </Box>
        </div>
    )
}
