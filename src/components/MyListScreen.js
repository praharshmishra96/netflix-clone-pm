import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import Nav from './Nav'
import { dbInstance } from './axios'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { selectUser } from "../features/user/userSlice"

function MyListScreen() {
    const user = useSelector(selectUser);
    const [likedMovies, setLikedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const req = await dbInstance.get(`/liked/${user.email}`);
                setLikedMovies(req.data.movies);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [user.email])

    function truncate(string, n) {
        return string?.length > n ? string.substr(0,n-1) + "..." : string;
    }

    async function removeFromLikedMovies(e, movieId) {
        try {
            const req = await dbInstance.put('/delete', { email: user.email, movieId: movieId });
            setLikedMovies(req.data.movies);
            setSelectedMovie(null);
        } catch (err) {
            console.log(err);
        }
    }

    function playMovies(e, media_type, movie_id) {
        navigate('/trailer', {
            state: {
                mediaType: media_type,
                movieId: movie_id
            }
        });
    }

    function openMovieInfo(e, movie) {
        if (window.innerWidth <= 768) {
            setSelectedMovie(movie);
        }
    }

    return (
        <div>
            <Nav />
            <Container>
                <h2>My List</h2>
                {likedMovies?.length > 0 &&
                    <Carousel>
                        {likedMovies.map((movie) => (
                            <Wrap key={movie.id} onClick={(e) => openMovieInfo(e, movie)}>
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.name} />
                                <MovieInfoContainer>
                                    <MovieInfoHeader>
                                        <div>
                                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.name} />
                                        </div>
                                        <MovieInfo>
                                            <h4>{movie.title || movie.name}</h4>
                                            <p>{truncate(movie.overview, 150)}</p>
                                        </MovieInfo>
                                    </MovieInfoHeader>
                                    <MovieInfoButtons>
                                        <PlayCircleFilledWhiteIcon onClick={(e) => playMovies(e, movie.media_type, movie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                        <DownloadForOfflineIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                        <CheckCircleIcon onClick={(e) => removeFromLikedMovies(e, movie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                        <InfoIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                    </MovieInfoButtons>
                                </MovieInfoContainer>
                            </Wrap>
                        ))}
                    </Carousel>
                }
            </Container>
            {selectedMovie &&
                <MovieInfoContainerMobile>
                    <MovieInfoHeader>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`} alt={selectedMovie.name} />
                        </div>
                        <MovieInfo>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h4>{selectedMovie.title || selectedMovie.name}</h4>
                                <CancelIcon onClick={(e) => setSelectedMovie(null)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                            </div>
                            <p>{truncate(selectedMovie.overview, 150)}</p>
                        </MovieInfo>
                    </MovieInfoHeader>
                    <MovieInfoButtons>
                        <PlayCircleFilledWhiteIcon onClick={(e) => playMovies(e, selectedMovie.media_type, selectedMovie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                        <DownloadForOfflineIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                        <CheckCircleIcon onClick={(e) => removeFromLikedMovies(e, selectedMovie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                        <InfoIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                    </MovieInfoButtons>
                </MovieInfoContainerMobile>
            }
        </div>
    )
}

export default MyListScreen

const Container = styled.div`
    position: relative;
    padding-top: 10vh;
    @media (max-width: 768px) {
        padding-bottom: 10vh;
    }
    h2 {
        margin: 0 30px 30px 30px;
    }
`

const Carousel = styled.div`
    margin: 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const MovieInfoContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1b1a1b;
    padding: 12.5px;
    border-radius: 5px;
    display: none;
    width: 130%;
    z-index: 10;
    height: fit-content;
    cursor: pointer;
    @media (max-width: 1440px) {
        padding: 10px;
    }
`

const MovieInfoHeader = styled.div`
    display: flex;
    align-items: flex-start;
    div {
        img {
            width: 110px;
            object-fit: contain;
            @media (max-width: 1440px) {
                width: 90px;
            }
            @media (max-width: 768px) {
                width: 110px;
            }
        }
    }
`

const MovieInfo = styled.div`
    flex-grow: 1;
    padding-left: 10px;
    h4 {
        font-size: 1.2rem;
    }
    p {
        margin-top: 10px;
        font-size: 1.025rem;
    }
    @media (max-width: 1440px) {
        h4 {
            font-size: 0.95rem;
        }
        p {
            margin-top: 10px;
            font-size: 0.825rem;
        }
    }
    @media (max-width: 768px) {
        h4 {
            font-size: 1.15rem;
        }
        p {
            font-size: 0.95rem;
        }
    }
`

const MovieInfoButtons = styled.div`
    display: flex;
    padding-top: 10px;
    justify-content: space-evenly;
    .MuiSvgIcon-root {
        @media (max-width: 1440px) {
            font-size: 2.25rem !important;
        }
        @media (max-width: 768px) {
            font-size: 3rem !important;
        }
        &:hover {
            opacity: 1 !important;
        }
    }
`

const Wrap = styled.div`
    position: relative;
    width: calc(100%/6);
    padding: 0 10px;
    margin-bottom: 27.5px;
    img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
    }
    &:hover ${MovieInfoContainer} {
        display: block;
        @media (max-width: 768px) {
            display: none;
        }
    }
    @media (max-width: 768px) {
        width: calc(100%/2);
    }
`

const MovieInfoContainerMobile = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #1b1a1b;
    padding: 12.5px;
    cursor: pointer;
    animation: animatebottom 500ms;
    @media (min-width: 769px) {
        display: none;
    }
`