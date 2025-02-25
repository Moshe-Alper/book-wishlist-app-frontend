import { userService } from '../services/user'
import { BookPreview } from './BookPreview'

export function BookList({ books, onRemoveBook, onUpdateBook }) {
    
    function shouldShowActionBtns(book) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return book.owner?._id === user._id
    }

    return <section>
        <ul className="list">
            {books.map(book =>
                <li key={book._id}>
                    <BookPreview book={book}/>
                    {shouldShowActionBtns(book) && <div className="actions">
                        <button onClick={() => onUpdateBook(book)}>Edit</button>
                        <button onClick={() => onRemoveBook(book._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}