import React from 'react'
import { Book } from '../types'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
    book: Book
}

export default function BookItem(props: Props) {
    return (
        <Box
            border={[1, 1, 1, 1]}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,

            }}
        >
            <Box
                sx={{
                    backgroundImage: `url('/api/books/${props.book.id}/preview')`,
                    backgroundSize: 'cover',
                    height: '300px',
                    flexBasis: '30%',
                    borderRight: 1
                }}
            ></Box>
            <Box sx={{
                flex: 1,
                padding: 3
            }}>
                <Link to={`/books/${props.book.id}`}>
                    <Typography
                        variant='h4'
                    >{props.book.name}</Typography>
                </Link>
                <Typography
                    variant='h6'
                    sx={{
                        fontStyle: 'italic'
                    }}
                >{props.book.writter}</Typography>
                <Typography
                    variant='subtitle1'
                >ISBN:{props.book.isbn}</Typography>
                <Typography
                >Genre:{props.book.genre.name}</Typography>
                <Typography
                >Pages:{props.book.pages}</Typography>
                <Typography
                >Published year:{props.book.publishedYear}</Typography>
                <Typography
                >Description</Typography>
                <Typography
                    variant='body2'
                >{props.book.description}</Typography>
            </Box>
        </Box>
    )
}
