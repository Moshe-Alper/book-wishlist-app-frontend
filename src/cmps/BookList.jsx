import { useState } from 'react'
import { BookPreview } from './BookPreview'


export function BookList({ books, onRemoveBook, onUpdateBook }) {
    const [currentPage, setCurrentPage] = useState(0)


    function handleNextPage() {
        if (currentPage < books.length - 1) {
            setCurrentPage(prevPage => prevPage + 1)
        }
    }

    function handlePrevPage() {
        if (currentPage > 0 ) {
            setCurrentPage(prevPage => prevPage - 1)
        }
    }

    if (!books || books.length === 0) return <div>No books available</div>

    const currentBook = books[currentPage]
    if (!currentBook) return <div>Loading...</div>
    
    return <section>
        <ul className="list">
            
                <li>
                    <BookPreview book={currentBook}/>
                </li>
        </ul>
    </section>
}