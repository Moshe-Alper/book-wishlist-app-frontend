
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


async function query(filterBy = { txt: '', price: 0 }) {
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
    
    books = books.map(({ _id, title, price, rating, author, description }) => ({ _id, title, price, rating, author, description }))
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
    var savedBook
    if (book._id) {
        const bookToSave = {
            _id: book._id,
            price: book.price,
            rating: book.rating,
        }
        savedBook = await storageService.put(STORAGE_KEY, bookToSave)
    } else {
        const bookToSave = {
            title: book.title,
            price: book.price,
            rating: book.rating,
            // Later, author is set by the backend
            author: userService.getLoggedinUser(),
            msgs: []
        }
        savedBook = await storageService.post(STORAGE_KEY, bookToSave)
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