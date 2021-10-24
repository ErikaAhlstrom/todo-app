import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'
import { logoutUserFetch } from '../fetches/fetches'

export default function LogoutBtn() {
    
    const {getLoggedIn} = useContext(AuthContext)

    const history = useHistory();

    async function logout() {
        await logoutUserFetch()
        await getLoggedIn();
        history.push("/login");
    }

    return (
        <button 
        className="btn btn-logout new-note-btn btn-secondary"
        onClick={logout}>Logout</button>
    )
}
