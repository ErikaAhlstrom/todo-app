import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'

export default function LogoutBtn() {
    
    const {getLoggedIn} = useContext(AuthContext)

    const history = useHistory();

    async function logout() {
        await axios.get("http://localhost:5000/auth/logout");
        await getLoggedIn();
        history.push("/login");
    }

    return (
        <button 
        className="btn new-note-btn btn-secondary"
        onClick={logout}>Logout</button>
    )
}
