import React, { useRef, useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ToggleContext } from './LoginScreen'
import { useDispatch } from "react-redux";
import { setUserLogin, setSignOut } from "../features/user/userSlice";

function SignupScreen() {
    const { toggle, email, setToggle } = useContext(ToggleContext);
    const [emailAddress, setEmailAddress] = useState(email);
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.value = emailAddress;
    }, [emailAddress])

    const register = (e) => {
        e.preventDefault();

        if(!emailRef.current.value || !passwordRef.current.value) {
            return false;
        };

        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            dispatch(setUserLogin({
                uid: authUser.user.uid,
                email: authUser.user.email
            }));
        }).catch((error) => {
            dispatch(setSignOut());
            alert(error.message);
        });
    }

    const signIn = (e) => {
        e.preventDefault();

        if(!emailRef.current.value || !passwordRef.current.value) {
            return false;
        };

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            dispatch(setUserLogin({
                uid: authUser.user.uid,
                email: authUser.user.email
            }));
        }).catch((error) => {
            dispatch(setSignOut());
            alert(error.message);
        });
    }

    return (
        <Container>
            <SignupScreenBody>
                <form>
                    {toggle === "signin" ? (<h2>Sign In</h2>) : (<h2>Sign Up</h2>)}
                    <input ref={emailRef} type="email" placeholder="Email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    {toggle === "signin" ? (
                        <button type="submit" onClick={(e) => signIn(e)}>Sign In</button>
                    ) : (
                        <button type="submit" onClick={(e) => register(e)}>Sign Up</button>
                    )}
                    {toggle === "signin" ? (
                        <h4>
                            <span style={{color: "gray"}}>New to Netflix? </span>
                            <SignupScreenLink onClick={(e) => setToggle("signup")}>Sign up now.</SignupScreenLink>
                        </h4>
                    ) : (
                        <h4>
                            <span style={{color: "gray"}}>Already have an account? </span>
                            <SignupScreenLink onClick={(e) => setToggle("signin")}>Sign In.</SignupScreenLink>
                        </h4>
                    )
                    }
                </form>
            </SignupScreenBody>
        </Container>
    )
}

export default SignupScreen

const Container = styled.div`
    position: absolute;
    top: 20%;
    z-index: 1;
    color: #fff;
    padding: 20px;
    width: 100%;
    text-align: center;
`

const SignupScreenBody = styled.div`
    max-width: 450px;
    padding: 70px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;

    @media (max-width:768px) {
        padding: 50px 30px;
    }

    h2 {
        font-size: 1.75rem;
        text-align: left;
        margin-bottom: 25px;
    }

    h4 {
        font-size: 0.95rem;
        text-align: left;
        margin-top: 30px;
        font-weight: 400;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        height: 50px;
        padding: 0 15px;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        border: none;
        margin-bottom: 15px;
        background: #333;
        color: #fff;
    }

    button {
        height: 50px;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        border: none;
        font-weight: 400;
        color: #fff;
        background-color: #e50914;
        margin-top: 25px;
        cursor: pointer;
    }
`

const SignupScreenLink = styled.span`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`