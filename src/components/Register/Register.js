import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register } from '../../redux/features/authSlice'
import { useDispatch, useSelector } from "react-redux"
import "./register.css"


const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: ""
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password, name, mobile } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        error && alert(error)
    }, [error])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password && name && mobile) {
            dispatch(register({ formValue, navigate, toast }))
        }
        console.log(formValue)
    };
    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    return (
    <div className="register">
        <Link to="/">
            <img src="./amazonlogo.jpg" alt="" className="register_logo" />
        </Link>

        <div className="register_container">
            <h1>Sign Up</h1>
            <form>
                <h5>Your name</h5>
                <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={onInputChange}
                    />

                <h5>Mobile number</h5>
                <input
                    type="Number"
                    value={mobile}
                    name="mobile"
                    onChange={onInputChange} />

                <h5>E-mail</h5>
                <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={onInputChange} />

                <h5>Password</h5>
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={onInputChange} />

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="register_Button">
                    Create Account
                </button>
            </form>

            <Link to="/Login">
                <button
                    className="login_Button">
                    Back to sign in
                </button>
            </Link>
        </div>
    </div>
    )
}

export default Register