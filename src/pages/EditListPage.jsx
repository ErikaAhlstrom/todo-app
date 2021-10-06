import React from 'react'
import { useHistory, Link } from "react-router-dom"; 

export default function EditListPage() {

    let history = useHistory()

    function getList() {
        
    }

    function handleEditList(title, todosArray) {
        const newList = {
            "user": "615712cf8eeaccf8d128b944",
            "title": title,
            "todos": todosArray
        }
        fetch(("http://localhost:5000/lists/add"), {
            method: "POST",
            body: JSON.stringify(newList),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                history.push("/")
                window.location.reload()
            })
            .catch(err => console.log("Error: ", err))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById("edit-title-input").value;
        const todos = document.getElementById("edit-todos-input").value;

        // Splittar text area på "newline" och skapar ett arrayitem för varje rad.
        const todosArray = todos.split(/\r?\n/);

        handleEditList(title, todosArray);
    }

    return (
        <div className="listPage">
            <h1> Edit your note</h1>
         <div className="create-list">
            <form onSubmit={handleSubmit}>
                <div className="create-list-header">
                    <input 
                        placeholder="Title" 
                        className="create-title-input" 
                        type="text"
                        name="create-title"
                        required="true" 
                        id="edit-title-input">
                        </input>
                </div>
                <textarea 
                    name="-create-todos"
                    placeholder="Notes..."
                    className="create-textarea"
                    id="edit-todos-input"
                    required="true" >
                </textarea>
                <div className="create-btn-container">
                    <Link to="/">
                        <button className="btn btn-secondary">Back</button>
                    </Link>
                <input 
                    className="btn btn-primary"
                    type="submit" 
                    value="Save" />
                </div>
            </form>
        </div>
        </div>
    )
}
