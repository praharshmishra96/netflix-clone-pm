import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Select from 'react-select'
import { tmdbInstance } from './axios'
import Row from './Row'

function FilteredTitles({title}) {
    const [genres, setGenres] = useState([]);
    const [showsGenre, setShowsGenre] = useState(28);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#000",
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            borderColor: "#fff",
            color: "#fff",
            cursor: "pointer",
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: state.isFocused ? "#fff" : "#fff"
            }
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "#fff",
            borderColor: "#000",
            "&:hover": {
                color: "#fff"
            }
        }),
        indicatorSeparator: base => ({
            ...base,
            display: "none"
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            color: state.isSelected ? "#000" : "#fff",
            background: state.isSelected ? "#fff" : "#000",
            "&:hover": {
                color: "#000",
                background: "#fff"
            },
            "&:active": {
                color: "#000",
                background: "#fff"
            }
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            background: "#000",
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0
        }),
        input: base => ({
            ...base,
            color: "#fff"
        }),
        singleValue: base => ({
            ...base,
            color: "#fff"
        })
    };

    useEffect(() => {
        async function fetchData() {
            const request = await tmdbInstance.get("/genre/movie/list?api_key=4cc5c4c66f3ba9a39f17936b12646c0c");
            (request.data.genres).map((g) => setGenres(prev => [...prev, { label: g.name, value: g.id }]));
        }
        fetchData();
    }, []);

    const refreshRows = (e) => {
        setShowsGenre(e.value);
    }

    return (
        <Container>
            <Filter>
                <h2>{title === "tv" ? "TV Shows" : "Movies"}</h2>
                {genres.length > 0 && 
                    <SelectMenu defaultValue={genres[0]} onChange={(e) => refreshRows(e)} options={genres} styles={customStyles} />
                }
            </Filter>
            <Row title="Popular on Netflix" mediaType={`${title}`} fetchUrl={`/discover/${title}?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&with_networks=213&with_genres=${showsGenre}&sort_by=vote_count.desc`} zindex={5} />
            <Row title="Only on Netflix" mediaType={`${title}`} fetchUrl={`/discover/${title}?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&with_networks=213&with_genres=${showsGenre}`} zindex={4} />
            <Row title="Trending Now" mediaType={`${title}`} fetchUrl={`/trending/${title}/week?api_key=4cc5c4c66f3ba9a39f17936b12646c0c`} zindex={3} />
            {title === "tv" ? (
                <Row title="New Releases" mediaType={`${title}`} fetchUrl={`/discover/${title}?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&with_networks=213&with_genres=${showsGenre}&sort_by=${title === "tv" ? "first_air_date" : "primary_release_date"}.desc`} zindex={2} />
            ) : (
                <Row title="New Releases" mediaType={`${title}`} fetchUrl={`/${title}/now_playing?api_key=4cc5c4c66f3ba9a39f17936b12646c0c`} zindex={2} />
            )}
            <Row title="Top Rated" mediaType={`${title}`} fetchUrl={`/${title}/top_rated?api_key=4cc5c4c66f3ba9a39f17936b12646c0c`} zindex={1} />
        </Container>
    )
}

export default FilteredTitles

const Container = styled.div`
    position: relative;
    padding-top: 10vh;
    @media (max-width: 768px) {
        padding-bottom: 10vh;
    }
`

const Filter = styled.div`
    display: flex;
    align-items: center;
    margin: 0 30px 30px 30px;
`

const SelectMenu = styled(Select)`
    margin-left: 25px;
    width: 20%;
    max-width: 200px;
    z-index: 100;
    @media (max-width: 768px) {
        flex-grow: 1;
    }
`