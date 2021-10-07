import axios from 'axios';
import React, {useState} from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useContext} from 'react';


export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const {getLoggedIn} = useContext(AuthContext)

    async function register(e) {
        e.preventDefault();

        try{
            const registerData = {
                firstName, 
                lastName, 
                email, 
                password
            }
            console.log(registerData);

            await axios.post("http://localhost:5000/auth", registerData);
            getLoggedIn();

        } catch(err) {

        }
    }

    

    return (
        
            <div className="loginPage">
                <div className="login-container">
                    <div className="login-header">
                        <h2>REGISTER</h2>
                    </div>
                <form onSubmit={register} action="">
                <div className="login-card">
                    <input 
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className="login-input input"
                    name="firstName" 
                    placeholder="Firstname"
                    type="text"/>
                    <input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="login-input input"
                    name="lastName" 
                    placeholder="Lastname"
                    type="text"/>
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input input"
                    name="email" 
                    placeholder="Email"
                    type="email"/>
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input input"
                    name="password" 
                    placeholder="Password"
                    type="password"/>
                </div>
                <input 
                    className="btn btn-primary btn-login"
                    type="submit" 
                    value="Register" />
            </form>
            <p className="register-text">Already have an account?</p>
            <Link className="register-link" to="/login">Login</Link>
            </div>
        </div>
    )
}
