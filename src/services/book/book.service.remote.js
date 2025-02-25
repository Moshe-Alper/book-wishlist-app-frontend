import { httpService } from '../http.service'

export const bookService = {
    query,
    getById,
    save,
    remove,
    addBookMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`book`, filterBy)
}

function getById(bookId) {
    return httpService.get(`book/${bookId}`)
}

async function remove(bookId) {
    return httpService.delete(`book/${bookId}`)
}
async function save(book) {
    var savedBook
    if (book._id) {
        savedBook = await httpService.put(`book/${book._id}`, book)
    } else {
        savedBook = await httpService.post('book', book)
    }
    return savedBook
}

async function addBookMsg(bookId, txt) {
    const savedMsg = await httpService.post(`book/${bookId}/msg`, {txt})
    return savedMsg
}