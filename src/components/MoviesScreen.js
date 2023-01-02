import React from 'react'
import Nav from './Nav'
import FilteredTitles from './FilteredTitles'

function MoviesScreen() {
    return (
        <div>
            <Nav />
            <FilteredTitles title="movie" />
        </div>
    )
}

export default MoviesScreen