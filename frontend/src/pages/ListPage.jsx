import React from 'react'
import {Link} from 'react-router-dom'

import ListItem from '../components/ListItem';
import LogoutBtn from '../components/LogoutBtn';

export default function ListPage({lists, user}) {



    return (
        <div className="listPage">
            <h1 className="header-1"> Welcome {user.firstName}</h1>
                <div className='header-buttons'>
                <Link to='/list/create' className="btn new-note-btn btn-success">New</Link>
                <LogoutBtn />
                </div>
            <div className="lists-header">
                {lists.length > 0 
                ? 
                <h2 className="header-2">Your Notes</h2>
                : 
               <h2 className="header-2">You haven't got any notes yet</h2>}
                
            </div>   
                {lists.length !== 0 &&
                 <div className="lists-container">
                    {lists.map(list => (
                        <ListItem key={list._id} list={list}/>
                    ))}
                </div>
                }
        </div>
    )
}
