import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        
            <div className="loginPage">
                <div className="login-container">
            <div className="login-header">
                <h2>LOGIN</h2>
            </div>
            <form  action="">
                <div className="login-card">
                    <input 
                    className="login-input input"
                    name="email" 
                    placeholder="Email"
                    type="email"/>
                    <input 
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
