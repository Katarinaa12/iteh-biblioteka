import React, { useEffect, useState } from 'react'
import { Book, Books } from '../types'
import axios from 'axios'
interface BooksSearchParams {
    name: string,
    size: number,
    page: number,
    genre_id: number
}

export function useSearchBooks(params: Partial<BooksSearchParams>) {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState<Books | undefined>(undefined)

    useEffect(() => {
        setLoading(true);
        axios.get('/api/books', {
            params
        }).then((result) => {
            setBooks(result.data)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [params.name, params.genre_id, params.page, params.size])

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