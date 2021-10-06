import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
    return (
        
            <div className="loginPage">
                <div className="login-container">
                    <div className="login-header">
                        <h2>REGISTER</h2>
                    </div>
                <form  action="">
                <div className="login-card">
                    <input 
                    className="login-input input"
                    name="firstName" 
                    placeholder="Firstname"
                    type="text"/>
                    <input 
                    className="login-input input"
                    name="lastName" 
                    placeholder="Lastname"
                    type="text"/>
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
                    value="Register" />
            </form>
            <p className="register-text">Already have an account?</p>
            <Link className="register-link" to="/login">Login</Link>
            </div>
        </div>
    )
}
