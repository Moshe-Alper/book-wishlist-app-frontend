import { Link } from 'react-router-dom'

export function BookPreview({ book }) {
    return <article className="preview">
        <header>
            <Link to={`/book/${book._id}`}>{book.vendor}</Link>
        </header>

        <p>Speed: <span>{book.speed.toLocaleString()} Km/h</span></p>
        {book.owner && <p>Owner: <span>{book.owner.fullname}</span></p>}
        
    </article>
}