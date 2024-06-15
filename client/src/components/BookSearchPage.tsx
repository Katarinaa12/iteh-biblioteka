import React from 'react'
import { useSearchBooks } from '../hooks/apiHooks'

export default function BookSearchPage() {
    const { books } = useSearchBooks();
    return (
        <div>BookSearchPage</div>
    )
}
