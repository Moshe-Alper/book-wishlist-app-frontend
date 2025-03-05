import { RatingReview } from "./RatingReview";

export function BookPreview({ book }) {
    return <article className="preview">
        <header>
            <h1>{book.title}</h1>
        </header>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
        <h3>Rating: <span><RatingReview rating={book.rating} /></span></h3>
        <h3>Price: <span>${book.price}</span></h3>
    </article>
}