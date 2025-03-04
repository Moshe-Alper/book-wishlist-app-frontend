import React from 'react'
import { Routes, Route } from 'react-router'

import { BookIndex } from './pages/BookIndex.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="/" element={<BookIndex />} />
                </Routes>
            </main>
        </div>
    )
}


