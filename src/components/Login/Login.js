import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { googleSignIn, login } from '../../redux/features/authSlice'
import { GoogleLogin } from "react-google-login"
import GoogleButton from 'react-google-button'
import { gapi } from "gapi-script";
import { render } from 'react-dom'

const initialState = {
    email: "",
    password: ""
}

function Login() {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        error && alert(error)
    }, [error])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }))
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    };
    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: "600563067273-l3rd2fs1c0df8nk722s7k1ci5kjimohp.apps.googleusercontent.com",
            plugin_name: "chat",
        });
    });
    const googleSuccess = (resp) => {
        //console.log(">>>>>>>>>>", resp)
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
    };
    const googleFailure = (error) => {
        console.log(error)
    };
    return (
        <div className="login">

            <Link to="/">
                <img src="./amazonlogo.jpg" alt="" className="login_logo" />
            </Link>

            <div className="login_container">
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                    />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}

                    />
                    <button onClick={handleSubmit}
                        type="submit" className="login_signInButton">
                        Sign In
                    </button>
                    
                        <GoogleLogin
                         render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
                          )} 
                            clientId='600563067273-l3rd2fs1c0df8nk722s7k1ci5kjimohp.apps.googleusercontent.com'
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                            buttonText="Sign in with Google"
                        />
                   

                </form>

                <Link to="/register"> <button
                    className="login_registerButton">
                    Create your Amazon Account
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Login