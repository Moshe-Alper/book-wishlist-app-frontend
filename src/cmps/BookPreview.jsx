export function BookPreview({ book }) {
    return <article className="preview">
        <header>
            <h1>{book.title}</h1>
        </header>
        <h2>{book.author}</h2>
        <p>{book.description}</p>
        <h3>Rating: <span>{book.rating}</span></h3>
        <h4>Price: <span>{book.price}</span></h4>
        

    </article>
}