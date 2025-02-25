import { bookService } from '../../services/book'
import { store } from '../store'
import { ADD_BOOK, REMOVE_BOOK, SET_BOOKS, SET_BOOK, UPDATE_BOOK, ADD_BOOK_MSG } from '../reducers/book.reducer'

export async function loadBooks(filterBy) {
    try {
        const books = await bookService.query(filterBy)
        store.dispatch(getCmdSetBooks(books))
    } catch (err) {
        console.log('Cannot load books', err)
        throw err
    }
}

export async function loadBook(bookId) {
    try {
        const book = await bookService.getById(bookId)
        store.dispatch(getCmdSetBook(book))
    } catch (err) {
        console.log('Cannot load book', err)
        throw err
    }
}


export async function removeBook(bookId) {
    try {
        await bookService.remove(bookId)
        store.dispatch(getCmdRemoveBook(bookId))
    } catch (err) {
        console.log('Cannot remove book', err)
        throw err
    }
}

export async function addBook(book) {
    try {
        const savedBook = await bookService.save(book)
        store.dispatch(getCmdAddBook(savedBook))
        return savedBook
    } catch (err) {
        console.log('Cannot add book', err)
        throw err
    }
}

export async function updateBook(book) {
    try {
        const savedBook = await bookService.save(book)
        store.dispatch(getCmdUpdateBook(savedBook))
        return savedBook
    } catch (err) {
        console.log('Cannot save book', err)
        throw err
    }
}

export async function addBookMsg(bookId, txt) {
    try {
        const msg = await bookService.addBookMsg(bookId, txt)
        store.dispatch(getCmdAddBookMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add book msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetBooks(books) {
    return {
        type: SET_BOOKS,
        books
    }
}
function getCmdSetBook(book) {
    return {
        type: SET_BOOK,
        book
    }
}
function getCmdRemoveBook(bookId) {
    return {
        type: REMOVE_BOOK,
        bookId
    }
}
function getCmdAddBook(book) {
    return {
        type: ADD_BOOK,
        book
    }
}
function getCmdUpdateBook(book) {
    return {
        type: UPDATE_BOOK,
        book
    }
}
function getCmdAddBookMsg(msg) {
    return {
        type: ADD_BOOK_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBooks()
    await addBook(bookService.getEmptyBook())
    await updateBook({
        _id: 'm1oC7',
        title: 'Book-Good',
    })
    await removeBook('m1oC7')
    // TODO unit test addBookMsg
}
