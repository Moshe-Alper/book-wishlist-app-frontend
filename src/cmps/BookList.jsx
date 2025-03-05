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
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1)
        }
    }

    if (!books || books.length === 0) return <div>No books available</div>

    const currentBook = books[currentPage]
    if (!currentBook) return <div>Loading...</div>

    return (
        <section className="book-list">
            <section className="book-preview">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="nav-button prev-button"
                >
                    &lt;
                </button>

                <BookPreview book={currentBook} />
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === books.length - 1}
                    className="nav-button next-button"
                >
                    &gt;
                </button>
            </section>

            <section className="wish-list">
                <h2>Wish list</h2>
            </section>

        </section>
    )
}