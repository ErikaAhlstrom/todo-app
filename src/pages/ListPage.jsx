import React from 'react'
import {Link} from 'react-router-dom'

import ListItem from '../components/ListItem';

export default function ListPage({lists}) {
    return (
        <div className="listPage">
            <h1> Welcome, Erika</h1>
            <div className="lists-header">
                <h2>Your Notes</h2>
                <Link to='/list/create' className="btn new-note-btn btn-primary">New Note</Link>
            </div>   

            <div className="lists-container">
                {lists.map(list => (
                    <ListItem key={list._id} list={list}/>
                ))}
            </div>
        </div>
    )
}
