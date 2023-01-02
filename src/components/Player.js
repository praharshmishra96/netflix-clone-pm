import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from "react-router-dom"
import { tmdbInstance } from './axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'

function Player() {
    const location = useLocation();
    const navigate = useNavigate();
    let { mediaType, movieId } = location.state;
    const [ videoId, setVideoId ] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                if(mediaType === "tv") {
                    const request = await tmdbInstance.get(`/tv/${movieId}/videos?api_key=4cc5c4c66f3ba9a39f17936b12646c0c`);
                    const trailer = (request.data.results).filter((title) => (title.type === "Trailer" || title.type === "Teaser"));
                    setVideoId(trailer[0].key);
                } else {
                    const request = await tmdbInstance.get(`/movie/${movieId}/videos?api_key=4cc5c4c66f3ba9a39f17936b12646c0c`);
                    const trailer = (request.data.results).filter((title) => (title.type === "Trailer" || title.type === "Teaser"));
                    setVideoId((trailer[0].key));
                };
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [mediaType, movieId]);

    return (
        <Container>
            <IconButton onClick={() => navigate(-1)} style={{ position: 'absolute', top: '6vh', left: '1vh', color: "#fff" }}>
                <ArrowBackIcon style={{ fontSize: '2rem' }} />
            </IconButton>
            <TrailerPlayer src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></TrailerPlayer>
        </Container>
    )
}

export default Player

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`

const TrailerPlayer = styled.iframe`
    height: 100%;
    width: 100%;
    object-fit: contain;
`