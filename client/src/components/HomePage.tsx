import { Box, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

export default function HomePage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [randomFact, setRandomFact] = useState('');

    useEffect(() => {
        axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
            .then(res => {
                setRandomFact(res.data.text)
            }).catch(() => { })
    }, [])

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
                {
                    randomFact && (
                        <Typography
                            sx={{
                                mt: 5
                            }}
                            variant='h5'
                        >
                            {randomFact}
                        </Typography>
                    )
                }
            </Box>
        </div>
    )
}
