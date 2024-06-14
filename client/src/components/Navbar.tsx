import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import NavbarLink from './NavbarLink'
import { useUserContext } from '../userContext';

export default function Navbar() {
    const { user } = useUserContext();
    return (
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center'
                }}>
                    <NavbarLink to='/' label='ONLIBRARY' size='big' />
                    <NavbarLink to='/books' label='Books' size='normal' />
                    {
                        user && (
                            <NavbarLink to='/subscriptions' label='Subscriptions' size='normal' />
                        )
                    }
                </Box>
                {
                    user ? (
                        <Button color="inherit">
                            <Typography
                                noWrap
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    color: 'inherit',
                                    fontWeight: 500,
                                    letterSpacing: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Logout
                            </Typography>
                        </Button>
                    ) : (
                        <>
                            <NavbarLink to='/login' label='Login' size='normal' />
                            <NavbarLink to='/register' label='Register' size='normal' />

                        </>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}
