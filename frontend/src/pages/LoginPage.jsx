import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {useContext} from 'react';
import { loginUserFetch } from '../fetches/fetches'
import  LoginForm  from '../components/LoginForm'

export default function LoginPage() {
    const history = useHistory();
    const {getLoggedIn} = useContext(AuthContext)
    const [loginValue, setLoginValue] = useState({})


    async function handleOnSubmit(e) {
        e.preventDefault();
        try{
            await loginUserFetch(loginValue)
            getLoggedIn();
            history.push("/")
            window.location.reload();

        } catch(err) {
            console.error(err)
        }
    }
  const handleOnChange = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value })
  }

    
    return (
        
            <div className="loginPage">
                <div className="login-container">
            <div className="login-header">
                <h2 className="header-2">LOGIN</h2>
            </div>
           <LoginForm handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit}/>
            <p className="register-text">Don't have an account yet?</p>
            <Link className="register-link" to="/register">Register</Link>
            </div>
        </div>
    )
}
