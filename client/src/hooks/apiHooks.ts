import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Book, Books, Genre, Subscription } from '../types'


export function useSearchBooks() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState<Books | undefined>(undefined)
    const location = useLocation();
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const result = await axios.get('/api/books' + location.search)
            setBooks(result.data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchBooks();
    }, [location.search])

    return { books, loading, fetchBooks }
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

    return { book, loading, setBook }
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

    return { subscriptions, loading, setSubscriptions }
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

export function useBookFile(book?: Book) {
    const url = !book ? '' : `/api/books/${book.id}/file`;
    const [fileUrl, setFileUrl] = useState('');
    const splited = (book?.content || '').split('.');
    const extension = !book ? '' : splited[splited.length - 1];
    useEffect(() => {
        if (!url) {
            return
        }
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject();
                }
                return res.blob();
            })
            .then(bl => {
                const blob = extension === 'pdf' ? new Blob([bl], { type: 'application/pdf' }) : bl;
                setFileUrl(URL.createObjectURL(blob))
            })
            .catch(e => {
                setFileUrl('');
            })
    }, [url])

    return { fileUrl, extension };

}

export function useStatistics(url: string) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        axios.get(url + location.search)
            .then(res => {
                setData(res.data)
            }).finally(() => {
                setLoading(false)
            })
    }, [url, location.search])

    return { data, loading };

}