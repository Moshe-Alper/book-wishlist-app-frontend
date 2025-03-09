
import { storageService } from '../async-storage.service'
import { makeId, readJsonFile } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'book'
const booksFromJson = readJsonFile('data/book.json')

export const bookService = {
    query,
    getById,
    save,
    remove,
    addBookMsg
}
window.cs = bookService


async function query(filterBy = { xtxt: '', price: 0 }) {
    // var books = await storageService.query(STORAGE_KEY)
    let books = await booksFromJson
    const { txt, minRating, maxPrice, sortField, sortDir } = filterBy

    books = books.map(book => {
        if (!book._id) {
            book._id = makeId()
        }
        return book
    })


    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regex.test(book.title) || regex.test(book.description))
    }
    if (minRating) {
        books = books.filter(book => book.rating >= minRating)
    }
    if(sortField === 'title' || sortField === 'author'){
        books.sort((book1, book2) => 
            book1[sortField].localeCompare(book2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'rating'){
        books.sort((book1, book2) => 
            (book1[sortField] - book2[sortField]) * +sortDir)
    }
    
    books = books.map(({ _id, title, price, rating, author, description, isWished }) => ({ _id, title, price, rating, author, description, isWished }))
    return books
}

function getById(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
}

async function remove(bookId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, bookId)
}

async function save(book) {
    console.log('🚀 book in service', book)

    // Ensure books are loaded
    let books = await booksFromJson

    let savedBook
    if (book._id) {
        // Update existing book and toggle `isWished`
        const bookIdx = books.findIndex(b => b._id === book._id)
        if (bookIdx !== -1) {
            // Toggle the `isWished` value
            const updatedBook = {
                ...books[bookIdx],
                isWished: !books[bookIdx].isWished // Toggle value
            }
            books[bookIdx] = updatedBook
            savedBook = updatedBook
        }
    } else {
        // Create new book
        const bookToSave = {
            _id: makeId(),
            title: book.title,
            price: book.price,
            rating: book.rating,
            isWished: book.isWished,
            author: userService.getLoggedinUser(),
            msgs: []
        }
        books.push(bookToSave)
        savedBook = bookToSave
    }

    return savedBook
}

async function addBookMsg(bookId, txt) {
    // Later, this is all done by the backend
    const book = await getById(bookId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    book.msgs.push(msg)
    await storageService.put(STORAGE_KEY, book)

    return msg
}