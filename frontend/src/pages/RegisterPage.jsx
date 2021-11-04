import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useContext} from 'react';
import { registerUserFetch } from '../fetches/fetches'


export default function RegisterPage() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState(null)

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
            await registerUserFetch(registerData);
            getLoggedIn();
            history.push("/")
            window.location.reload();

        } catch(err) {
            setMessage(err.response.data.errorMessage)
        }
    }

    

    return (
        
            <div className="loginPage">
                <div className="login-container">
                    <div className="login-header">
                        <h2 className="header-2">REGISTER</h2>
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
            {message && <div className="message">{message}</div>}
            <p className="register-text">Already have an account?</p>
            <Link className="register-link" to="/login">Login</Link>
            </div>
        </div>
    )
}
