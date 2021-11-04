import React from 'react'
import {Link} from 'react-router-dom'

import ListItem from '../components/ListItem';
import LogoutBtn from '../components/LogoutBtn';

export default function ListPage({lists, user}) {



    return (
        <div className="listPage">
            <h1 className="header-1"> Welcome, {user.firstName}</h1>
            <div className="lists-header">
                {lists.length > 0 
                ? 
                <h2 className="header-2">Your Notes</h2>
                : 
               <h2 className="header-2">You haven't got any notes yet</h2>}
                <div>
                <LogoutBtn />
                <Link to='/list/create' className="btn new-note-btn btn-success">New Note</Link>
                </div>
                
            </div>   
                {lists.length === 0 ?
                <a href="/list/create" className="btn btn-primary">Create your first note</a>
                :
                <div className="lists-container">
                    {lists.map(list => (
                        <ListItem key={list._id} list={list}/>
                    ))}
                </div>
                }
        </div>
    )
}
