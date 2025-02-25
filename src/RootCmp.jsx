import React from 'react'
import { Routes, Route } from 'react-router'

import { BookIndex } from './pages/BookIndex.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />

            <main>
                <Routes>
                    <Route path="/" element={<BookIndex />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


