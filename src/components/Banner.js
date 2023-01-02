import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { tmdbInstance } from './axios'

function Banner() {
    const [movie, setMovie] = useState([]);
    const [truncateStatus, setTruncateStatus] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const request = await tmdbInstance.get("/discover/tv?api_key=4cc5c4c66f3ba9a39f17936b12646c0c&language=en-US&with_networks=213");
            setMovie(request.data.results[0]);
        }
        fetchData();
    }, []);

    function truncate(string, n) {
        if (truncateStatus) {
            return string?.length > n ? string.substr(0,n-1) + "..." : string;
        } else {
            return string;
        };
    }

    const setTruncateStatusfunc = (e) => {
        if (truncateStatus) {
            setTruncateStatus(false);
        } else {
            setTruncateStatus(true);
        };
    }

    return (
        <Container bgImg={movie?.backdrop_path}>
            <BannerContents>
                <BannerTitle>{movie?.title || movie?.name}</BannerTitle>
                <BannerDescription>{truncate(movie?.overview, 150)}</BannerDescription>
                <BannerButtons>
                    <BannerButton><PlayArrowIcon style={{ marginRight: "2.5px" }} />Play</BannerButton>
                    <BannerButton onClick={(e) => setTruncateStatusfunc(e)}><InfoOutlinedIcon style={{ marginRight: "5px" }} />More Info</BannerButton>
                </BannerButtons>
            </BannerContents>
            <LoginScreenGradient></LoginScreenGradient>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    position:relative;
    background-image: ${props => `url(https://image.tmdb.org/t/p/original${props.bgImg})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 70vh;
    color: #fff;
`

const LoginScreenGradient = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-image: linear-gradient(transparent,#000);
`

const BannerContents = styled.div`
    position: relative;
    margin: 0 30px;
    padding-top: 20vh;
    z-index: 2;
`

const BannerTitle = styled.h1`
    font-size: 3rem;
    max-width: 500px;
`

const BannerDescription = styled.h3`
    font-size: 1rem;
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    max-width: 500px;
    line-height: 1.5rem;
`

const BannerButtons = styled.div`
    display: flex;
    gap: 1rem;
`

const BannerButton = styled.button`
    display: flex;
    align-items: center;
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    outline: none;
    border: none;
    font-weight: 800;
    color: #fff;
    background-color: rgba(51, 51, 51, 0.5);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`