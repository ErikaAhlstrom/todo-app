import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
import { deleteListFetch } from '../fetches/fetches'

export default function ListItem({list}) {
    async function handleDeleteList() {
      try {
        await deleteListFetch(list._id)
        window.location.reload();
      } catch(err) {
            console.error(err)
        } 
    }
    return (
      
        <div className="list">
          <div className="list-header">
            <h3 className="header-3">{list.title}</h3>
            <div className="list-action-btns">
              <Link to={`/list/edit/${list._id}`} className= "list-edit-btn" href="#"><i className='bx bx-edit-alt'></i></Link>
              <i className='list-delete-btn bx bx-trash' onClick={handleDeleteList}></i>
            </div>
          </div>
          <hr className="list-line"></hr>
            <div className="text">
                {list.todos.map(todo => (
                    <p key={[todo]}>{todo}</p>
                ))}
            </div>
          <p className="list-date">{
            <Moment format="MMM Do hh:mm">{list.updatedAt}</Moment>}
          </p>
        </div>
        
    )
}
