
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'book'

export const bookService = {
    query,
    getById,
    save,
    remove,
    addBookMsg
}
window.cs = bookService


async function query(filterBy = { txt: '', price: 0 }) {
    var books = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regex.test(book.vendor) || regex.test(book.description))
    }
    if (minSpeed) {
        books = books.filter(book => book.speed >= minSpeed)
    }
    if(sortField === 'vendor' || sortField === 'owner'){
        books.sort((book1, book2) => 
            book1[sortField].localeCompare(book2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        books.sort((book1, book2) => 
            (book1[sortField] - book2[sortField]) * +sortDir)
    }
    
    books = books.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
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
            speed: book.speed,
        }
        savedBook = await storageService.put(STORAGE_KEY, bookToSave)
    } else {
        const bookToSave = {
            vendor: book.vendor,
            price: book.price,
            speed: book.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
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