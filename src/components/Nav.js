import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled/macro'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { setSignOut } from "../features/user/userSlice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [show, handleShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if (window.scrollY > 1) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.addEventListener("scroll", transitionNavBar);
    }, []);

    const signOutFn = () => {
        signOut(auth)
        .then(() => {
            dispatch(setSignOut());
        })
    }

    return (
        <Container color={show ? "#000" : "transparent"}>
            <NavContents>
                <NavContentsLeft>
                    <NavLogo onClick={(e) => navigate('/')} src="/images/netflix-logo.png"></NavLogo>
                    <HeaderOptions>
                        <HeaderOptionTitle href="/">Home</HeaderOptionTitle>
                        <HeaderOptionTitle href="/tv">TV Shows</HeaderOptionTitle>
                        <HeaderOptionTitle href="/movies">Movies</HeaderOptionTitle>
                        <HeaderOptionTitle href="/my-list">My List</HeaderOptionTitle>
                    </HeaderOptions>
                </NavContentsLeft>
                <NavContentsRight>
                    <NavAvatar src="/images/netflix-avatar.png"></NavAvatar>
                    <ArrowDropDownIcon style={{ color: "#fff" }} />
                    <SignOut>
                        <div onClick={signOutFn}>
                            Sign Out
                        </div>
                    </SignOut>
                </NavContentsRight>
            </NavContents>
        </Container>
    )
}

export default Nav

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: ${(props) => props.color};
`

const NavContents = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
`

const NavContentsLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const HeaderOptions = styled.div`
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 768px) {
        position: fixed;
        white-space: nowrap;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        padding: 25px 20px;
    }
`

const HeaderOptionTitle = styled.a`
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`

const SignOut = styled.a`
    position: absolute;
    top: 45px;
    display: none;
    cursor: pointer;
    div {
        background: #000;
        padding: 12.5px 20px;
        margin: 5px 0;
        color: #fff;
        font-size: 0.95rem;
    }
    &:hover {
    }
`

const NavContentsRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    &:hover ${SignOut} {
        align-items: center;
        display: flex;
        justify-content: center;
    }
`

const NavLogo = styled.img`
    width: 100px;
    margin-right: 20px;
    cursor: pointer;
`

const NavAvatar = styled.img`
    width: 30px;
    border-radius: 3px;
`