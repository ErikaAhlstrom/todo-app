import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment';

export default function ListItem({list}) {
    console.log(list)
    return (
        <div className="list">
          <div className="list-header">
            <h4>{list.title}</h4>
            <div className="list-action-btns">
              <Link to='/list/edit' className= "list-edit-btn" href="#"><i className='bx bx-edit-alt'></i></Link>
              <Link to='/list/delete' className= "list-delete-btn" href="#"><i className='bx bx-trash'></i></Link>
            </div>
          </div>
          <div className="todo is-complete">
            <div className="checkbox"></div>
            <div className="text">
                {list.todos.map(todo => (
                    <p>{todo}</p>
                ))}
            </div>
          </div>
          <p className="list-date">{
            <Moment format="YYYY-MM-DD">{list.updatedAt}</Moment>}
          </p>
        </div>
    )
}
