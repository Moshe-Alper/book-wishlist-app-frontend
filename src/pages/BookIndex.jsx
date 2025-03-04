import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBooks, addBook, updateBook, removeBook } from '../store/actions/book.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { bookService } from '../services/book/'
import { userService } from '../services/user'

import { BookList } from '../cmps/BookList'
import { BookFilter } from '../cmps/BookFilter'

export function BookIndex() {

    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())
    const books = useSelector(storeState => storeState.bookModule.books)

    useEffect(() => {
        loadBooks(filterBy)
    }, [filterBy])

    async function onRemoveBook(bookId) {
        try {
            await removeBook(bookId)
            showSuccessMsg('Book removed')            
        } catch (err) {
            showErrorMsg('Cannot remove book')
        }
    }

    async function onAddBook() {
        const book = bookService.getEmptyBook()
        book.title = prompt('Title?')
        try {
            const savedBook = await addBook(book)
            showSuccessMsg(`Book added (id: ${savedBook._id})`)
        } catch (err) {
            showErrorMsg('Cannot add book')
        }        
    }

    async function onUpdateBook(book) {
        const rating = +prompt('New rating?', book.rating)
        if(rating === 0 || rating === book.rating) return

        const bookToSave = { ...book, rating }
        try {
            const savedBook = await updateBook(bookToSave)
            showSuccessMsg(`Book updated, new rating: ${savedBook.rating}`)
        } catch (err) {
            showErrorMsg('Cannot update book')
        }        
    }

    return (
        <main className="book-index">
            <header>
                <h2>Books</h2>
                {userService.getLoggedinUser() && <button onClick={onAddBook}>Add a Book</button>}
            </header>
            <BookFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <BookList 
                books={books}
                onRemoveBook={onRemoveBook} 
                onUpdateBook={onUpdateBook}/>
        </main>
    )
}