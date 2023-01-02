import React, { useState, createContext } from 'react'
import styled from '@emotion/styled'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SignupScreen from './SignupScreen';

export const ToggleContext = createContext();

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState("signup");

    const redirectToSignIn = (e) => {
        e.preventDefault();

        setEmail("");
        setToggle("signin");
        setSignIn(true);
    }

    const redirectToSignup = (e) => {
        e.preventDefault();

        setToggle("signup");
        setSignIn(true)
    }

    return (
        <Container>
            <LoginScreenBackground>
                <LoginScreenLogo src="/images/netflix-logo.png"></LoginScreenLogo>
                <LoginScreenButton onClick={(e) => redirectToSignIn(e)}>
                    Sign In
                </LoginScreenButton>
                <LoginScreenGradient></LoginScreenGradient>
            </LoginScreenBackground>
            {signIn ? (
                <ToggleContext.Provider value={{ toggle, email, setToggle }}>
                    <SignupScreen />
                </ToggleContext.Provider>
            ) : (
                <LoginScreenBody>
                    <h1>Unlimited movies, TV shows and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <LoginScreenInput>
                        <form onSubmit={(e) => redirectToSignup(e)}>
                            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button type="submit">Get Started <NavigateNext></NavigateNext></button>
                        </form>
                    </LoginScreenInput>
                </LoginScreenBody>
            )}
        </Container>
    )
}

export default LoginScreen

const Container = styled.div`
    position: relative;
    height: 100%;
    background: url("/images/netflix-bg.jpg") center no-repeat;
    background-size: cover;
`

const LoginScreenBackground = styled.div`
`

const LoginScreenLogo = styled.img`
    position: fixed;
    left: 0;
    width: 150px;
    object-fit: contain;
    padding-left: 20px;
    padding-top: 20px;
`

const LoginScreenButton = styled.button`
    position: fixed;
    right: 20px;
    top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    color: #fff;
    background-color: #e50914;
    border: none;
    outline: none;
    cursor: pointer;
`

const LoginScreenGradient = styled.div`
    width: 100%;
    z-index: 1;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0,
        rgba(0, 0, 0, 0.8) 60%,
        rgba(0, 0, 0, 0.8) 100%,
    );
`

const LoginScreenBody = styled.div`
    position: absolute;
    top: 30%;
    z-index: 1;
    color: #fff;
    padding: 20px;
    width: 100%;
    text-align: center;

    h1 {
        font-size: 3rem;
        margin-bottom: 20px;

        @media (max-width:768px) {
            font-size: 1.75rem;
        }
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 400;
        margin-bottom: 30px;

        @media (max-width:768px) {
            font-size: 1.175rem;
        }
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 400;

        @media (max-width:768px) {
            font-size: 1.175rem;
        }
    }
`

const LoginScreenInput = styled.div`
    margin: 20px;

    input {
        height: 50px;
        padding: 0 10px;
        width: 30%;
        font-size: 1rem;
        border: none;
        outline: none;
        max-width: 600px;
    }

    button {
        padding: 0 30px;
        height: 50px;
        background-color: #e50914;
        font-size: 1rem;
        border: none;
        outline: none;
        color: #fff;
        font-weight: 400;
        cursor: pointer;
    }

    @media (max-width:768px) {
        display: flex;
        flex-direction: column;

        input {
            width: 100%;
            margin-bottom: 20px;
        }
    }
`

const NavigateNext = styled(ArrowForwardIosIcon)`
    font-size: 1rem;
    margin-bottom: -3px;
`