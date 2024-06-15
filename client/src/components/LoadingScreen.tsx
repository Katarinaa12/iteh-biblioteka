import { Box, Typography } from '@mui/material'
import React from 'react'

export default function LoadingScreen() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <Box sx={{
                padding: 8,
                backgroundColor: '#1976d2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography
                    variant='h3'
                    sx={{
                        color: 'white'
                    }}
                >
                    ONLIBRARY
                </Typography>
            </Box>
        </Box>
    )
}
