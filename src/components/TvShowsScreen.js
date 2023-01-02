import React from 'react'
import Nav from './Nav'
import FilteredTitles from './FilteredTitles'

function TvShowsScreen() {
    return (
        <div>
            <Nav />
            <FilteredTitles title="tv" />
        </div>
    )
}

export default TvShowsScreen