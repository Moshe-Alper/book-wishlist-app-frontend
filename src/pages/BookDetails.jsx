import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadBook, addBookMsg } from '../store/actions/book.actions'


export function BookDetails() {

  const {bookId} = useParams()
  const book = useSelector(storeState => storeState.bookModule.book)

  useEffect(() => {
    loadBook(bookId)
  }, [bookId])

  async function onAddBookMsg(bookId) {
    try {
        await addBookMsg(bookId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Book msg added`)
    } catch (err) {
        showErrorMsg('Cannot add book msg')
    }        

}

  return (
    <section className="book-details">
      <Link to="/book">Back to list</Link>
      <h1>Book Details</h1>
      {book && <div>
        <h3>{book.vendor}</h3>
        <h4>${book.price}</h4>
        <pre> {JSON.stringify(book, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddBookMsg(book._id) }}>Add book msg</button>

    </section>
  )
}