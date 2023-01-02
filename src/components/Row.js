import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled/macro'
import Slider from "react-slick"
import { tmdbInstance, dbInstance } from './axios'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'
import { useSelector } from "react-redux"
import { selectUser } from "../features/user/userSlice"
import { useNavigate } from 'react-router-dom'
import { ToggleContext } from '../App.js'

function Row({title, mediaType, fetchUrl, zindex}) {
    const user = useSelector(selectUser);
    const [movies, setMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);
    const { selectedMovie, setSelectedMovie } = useContext(ToggleContext);
    const navigate = useNavigate();
    const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <PrevButton {...props} className={'prev'}/>
    );
    const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <NextButton {...props} className={'next'}/>
    );
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <ArrowRight />,
        prevArrow: <ArrowLeft />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await tmdbInstance.get(fetchUrl);
                setMovies((request.data.results).filter((movie) => (movie.backdrop_path != null)));
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [fetchUrl]);

    useEffect(() => {
        async function fetchLikedMovies() {
            try {
                const req = await dbInstance.get(`/liked/${user.email}`);
                if(req.data.movies && req.data.movies.length > 0) {
                    const movieIds = req.data.movies.map((movie) => movie.id);
                    setLikedMovies(movieIds);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchLikedMovies();
    }, [user.email])

    function truncate(string, n) {
        return string?.length > n ? string.substr(0,n-1) + "..." : string;
    }

    async function addToLikedMovies(e, media_type, movie) {
        movie['media_type'] = media_type;
        try {
            await dbInstance.post('/add', { email: user.email, data: movie });
            setLikedMovies([...likedMovies, movie.id]);
        } catch (err) {
            console.log(err);
        }
    }

    async function removeFromLikedMovies(e, movieId) {
        try {
            const req = await dbInstance.put('/delete', { email: user.email, movieId: movieId });
            setLikedMovies(req.data.movies);
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

    function openMovieInfo(e, media_type, movie) {
        movie['media_type'] = media_type;
        if (window.innerWidth <= 768) {
            setSelectedMovie(movie);
        }
    }

    return (
        <>
        {(movies.length > 5) &&
        <Container style={{ zIndex: zindex }}>
            <h2>{title}</h2>
            <Carousel {...settings}>
                {movies.map((movie) => (
                    <Wrap key={movie.id} onClick={(e) => openMovieInfo(e, (mediaType === "all" ? movie.media_type : mediaType), movie)}>
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
                                <PlayCircleFilledWhiteIcon onClick={(e) => playMovies(e, (mediaType === "all" ? movie.media_type : mediaType), movie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                <DownloadForOfflineIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                {likedMovies?.includes(movie.id) ? (
                                    <CheckCircleIcon onClick={(e) => removeFromLikedMovies(e, movie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                ) : (
                                    <AddCircleIcon onClick={(e) => addToLikedMovies(e, (mediaType === "all" ? movie.media_type : mediaType), movie)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                                )}
                                <InfoIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                            </MovieInfoButtons>
                        </MovieInfoContainer>
                    </Wrap>
                ))}
            </Carousel>
        </Container>
        }
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
                    {likedMovies?.includes(selectedMovie.id) ? (
                        <CheckCircleIcon onClick={(e) => removeFromLikedMovies(e, selectedMovie.id)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                    ) : (
                        <AddCircleIcon onClick={(e) => addToLikedMovies(e, selectedMovie.media_type, selectedMovie)} style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                    )}
                    <InfoIcon style={{ fontSize: "2.75rem", color: "whitesmoke", opacity: "0.4" }} />
                </MovieInfoButtons>
            </MovieInfoContainerMobile>
        }
        </>
    )
}

export default Row

const Container = styled.div`
    position: relative;
    width: 100%;
    h2 {
        padding: 0 30px;
    }
`

const Carousel = styled(Slider)`
    margin: 0 20px;
    .slick-list {
        overflow: visible;
        @media (max-width: 768px) {
            overflow: hidden;
        }
    }
`

const PrevButton = styled(ArrowBackIosIcon)`
    position: absolute;
    left: 1.25%;
    top: 50%;
    z-index: 1;
    cursor: pointer;
    font-weight: 600;
`

const NextButton = styled(ArrowForwardIosIcon)`
    position: absolute;
    right: 1%;
    top: 50%;
    z-index: 1;
    cursor: pointer;
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
    padding: 0 10px;
    margin: 27.5px 0;
    img {
        margin-left: auto;
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