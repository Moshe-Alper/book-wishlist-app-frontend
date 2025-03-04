const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { bookService as local } from './book.service.local'
import { bookService as remote } from './book.service.remote'

function getEmptyBook() {
	return {
		title: makeId(),
		rating: getRandomIntInclusive(80, 240),
		msgs: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minRating: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const bookService = { getEmptyBook, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.bookService = bookService
