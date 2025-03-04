export const SET_BOOKS = 'SET_BOOKS'
export const SET_BOOK = 'SET_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const ADD_BOOK_MSG = 'ADD_BOOK_MSG'

const initialState = {
    books: [],
    book: null
}

export function bookReducer(state = initialState, action) {
    var newState = state
    var books
    switch (action.type) {
        case SET_BOOKS:
            newState = { ...state, books: action.books }
            break
        case SET_BOOK:
            newState = { ...state, book: action.book }
            break
        case REMOVE_BOOK:
            const lastRemovedBook = state.books.find(book => book._id === action.bookId)
            books = state.books.filter(book => book._id !== action.bookId)
            newState = { ...state, books, lastRemovedBook }
            break
        case ADD_BOOK:
            newState = { ...state, books: [...state.books, action.book] }
            break
        case UPDATE_BOOK:
            books = state.books.map(book => (book._id === action.book._id) ? action.book : book)
            newState = { ...state, books }
            break
        case ADD_BOOK_MSG:
            newState = { ...state, book: { ...state.book, msgs: [...state.book.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const book1 = { _id: 'b101', title: 'Book ' + parseInt(Math.random() * 10), msgs: [] }
    const book2 = { _id: 'b102', title: 'Book ' + parseInt(Math.random() * 10), msgs: [] }

    state = bookReducer(state, { type: SET_BOOKS, books: [book1] })
    console.log('After SET_BOOKS:', state)

    state = bookReducer(state, { type: ADD_BOOK, book: book2 })
    console.log('After ADD_BOOK:', state)

    state = bookReducer(state, { type: UPDATE_BOOK, book: { ...book2, title: 'Good' } })
    console.log('After UPDATE_BOOK:', state)

    state = bookReducer(state, { type: REMOVE_BOOK, bookId: book2._id })
    console.log('After REMOVE_BOOK:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = bookReducer(state, { type: ADD_BOOK_MSG, bookId: book1._id, msg })
    console.log('After ADD_BOOK_MSG:', state)

    state = bookReducer(state, { type: REMOVE_BOOK, bookId: book1._id })
    console.log('After REMOVE_BOOK:', state)
}

