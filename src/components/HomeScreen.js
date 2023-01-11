import React from 'react'
import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'
import styled from '@emotion/styled'

function HomeScreen() {
  return (
    <Container>
        <Nav />
        <Banner mediaType="tv" />
        <Row title="Popular on Netflix" mediaType="tv" fetchUrl="/discover/tv?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&with_networks=213&sort_by=vote_count.desc" zindex={5} />
        <Row title="Only on Netflix" mediaType="tv" fetchUrl="/discover/tv?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&with_networks=213" zindex={4} />
        <Row title="Trending Now" mediaType="all" fetchUrl="/trending/all/week?api_key=4cc5c4c66f3ba9a39f17936b12646c0c" zindex={3} />
        <Row title="New Releases" mediaType="movie" fetchUrl="/movie/now_playing?api_key=4cc5c4c66f3ba9a39f17936b12646c0c" zindex={2} />
        <Row title="Top Rated" mediaType="movie" fetchUrl="/movie/top_rated?api_key=4cc5c4c66f3ba9a39f17936b12646c0c" zindex={1} />
    </Container>
  )
}

export default HomeScreen

const Container = styled.div`
    @media (max-width: 768px) {
        padding-bottom: 10vh;
    }
`
