import React from 'react';
import { useHistory, Link } from "react-router-dom"; 
import { createListFetch } from '../fetches/fetches';


export default function CreateListPage() {
    let history = useHistory()

    async function handleCreateList(title, todosArray) {

        try {
            const newList = {
                "title": title,
                "todos": todosArray
            }
            createListFetch(newList)
            history.push("/")
            window.location.reload()
            
        } catch (err) {
            console.log("Error: ", err)
        }      
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById("create-title-input").value;
        const todos = document.getElementById("create-todos-input").value;

        // Splittar text area på "newline" och skapar ett arrayitem för varje rad.
        const todosArray = todos.split(/\r?\n/);

        handleCreateList(title, todosArray);
    }

    return (
        <div className="listPage">
            <h1> Add new note</h1>
         <div className="create-list">
            <form onSubmit={handleSubmit}>
                <div className="create-list-header">
                    <input 
                        placeholder="Title" 
                        className="input create-title-input" 
                        type="text"
                        name="title"
                        required={true} 
                        id="create-title-input">
                        </input>
                </div>
                <textarea 
                    name="todos"
                    placeholder="Notes..."
                    className="input create-textarea"
                    id="create-todos-input"
                    required={true}  >
                </textarea>
                <div className="create-btn-container">
                    <Link to="/">
                        <button className="btn btn-secondary">Back</button>
                    </Link>
                <input 
                    className="btn btn-success"
                    type="submit" 
                    value="Save" />
                </div>
            </form>
        </div>
        </div>
    )
}
