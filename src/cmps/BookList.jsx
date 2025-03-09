import { useState } from 'react'
import { BookPreview } from './BookPreview'
import { BookFilter } from './BookFilter'


export function BookList({ books, onUpdateBook, filterBy, setFilterBy }) {
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

    function handleToggleWish(book) {
        onUpdateBook({ ...book, isWished: !book.isWished });
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

                <BookPreview 
                book={currentBook} 
                onToggleWish={handleToggleWish}
                />
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === books.length - 1}
                    className="nav-button next-button"

                >
                    &gt;
                </button>
            </section>

            <section className="wish-list">
            <div className="wishlisted-books">
                <BookFilter 
                filterBy={filterBy} 
                setFilterBy={setFilterBy} 
                />
                
                {books
                    .filter(book => book.isWished)
                    .map(book => (
                        <li key={book._id}>
                            <h1>{book.title}</h1>
                            </li>
                    ))}
            </div>
        </section>

        </section>
    )
}