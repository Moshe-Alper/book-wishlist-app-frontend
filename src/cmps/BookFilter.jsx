import { useState, useEffect } from 'react'

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const { type, name, value } = ev.target
        let newValue = value

        if (name === 'sortDir') {
            newValue = +value
            if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
        } else if (type === 'number') {
            newValue = +value || ''
        }

        setFilterToEdit({ ...filterToEdit, [name]: newValue })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minprice: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return (
        <section className="book-filter">
            <div className="sort-field">
                <label>
                    <input
                        type="radio"
                        name="sortField"
                        value="price"
                        checked={filterToEdit.sortField === 'price'}
                        onChange={handleChange}
                    />
                    <span>Price</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortField"
                        value="title"
                        checked={filterToEdit.sortField === 'title'}
                        onChange={handleChange}
                    />
                    <span>Title</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortField"
                        value="rating"
                        checked={filterToEdit.sortField === 'rating'}
                        onChange={handleChange}
                    />
                    <span>Rating</span>
                </label>
            </div>
            <div className="sort-dir">
                <label>
                    <input
                        type="radio"
                        name="sortDir"
                        value="1"
                        checked={filterToEdit.sortDir === 1}
                        onChange={handleChange}
                    />
                    <span>↑</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortDir"
                        value="-1"
                        checked={filterToEdit.sortDir === -1}
                        onChange={handleChange}
                    />
                    <span>↓</span>
                </label>
            </div>
            <button className="btn-clear" onClick={clearSort}>Clear</button>
        </section>
    )
}
