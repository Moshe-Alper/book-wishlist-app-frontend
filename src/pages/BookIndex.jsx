import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBooks, addBook, updateBook, removeBook } from '../store/actions/book.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { bookService } from '../services/book/'
import { userService } from '../services/user'

import { BookList } from '../cmps/BookList'

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
        const isWished = !book.isWished
        const bookToSave = { ...book, isWished }
    
        try {
            const savedBook = await updateBook(bookToSave)
            showSuccessMsg(`Book updated, wish status: ${isWished ? 'Wished' : 'Not wished'}`)
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
            <BookList 
                books={books}
                onUpdateBook={onUpdateBook}
                filterBy={filterBy} 
                setFilterBy={setFilterBy}
                />
        </main>
    )
}