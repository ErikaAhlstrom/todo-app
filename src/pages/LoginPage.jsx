import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function LoginPage() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();

        try{
            const loginData = {
                email, 
                password
            }
            console.log(loginData);

            await axios.post("http://localhost:5000/auth/login", loginData);

        } catch(err) {

        }
    }

    
    return (
        
            <div className="loginPage">
                <div className="login-container">
            <div className="login-header">
                <h2>LOGIN</h2>
            </div>
            <form  onSubmit={login} action="">
                <div className="login-card">
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
                    value="Login" />
            </form>
            <p className="register-text">Don't have an account yet?</p>
            <Link className="register-link" to="/register">Register</Link>
            </div>
        </div>
    )
}
