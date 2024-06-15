import React, { useEffect, useState } from 'react'
import { Book, Books, Genre, Subscription } from '../types'
import axios from 'axios'
import { useLocation, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
interface BooksSearchParams {
    name: string,
    size: number,
    page: number,
    genre_id: number
}

export function useSearchBooks() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState<Books | undefined>(undefined)
    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        axios.get('/api/books' + location.search).then((result) => {
            setBooks(result.data)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [location])

    return { books, loading }
}

export function useGetBook(bookId: number) {
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState<Book | undefined>(undefined)

    useEffect(() => {
        setLoading(true);
        axios.get('/api/books/' + bookId,).then((result) => {
            setBook(result.data)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [bookId])

    return { book, loading }
}

export function useGetSubscriptions() {
    const [loading, setLoading] = useState(true)
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    useEffect(() => {
        setLoading(true);
        axios.get('/api/subscriptions').then((result) => {
            setSubscriptions(result.data)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { subscriptions, loading }
}

export function useGetGenres() {
    const [loading, setLoading] = useState(true)
    const [genres, setGenres] = useState<Genre[]>([])
    useEffect(() => {
        setLoading(true);
        axios.get('/api/genres').then((result) => {
            setGenres(result.data)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { genres, loading }
}