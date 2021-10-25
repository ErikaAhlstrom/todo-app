import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom"; 
import { createListFetch } from '../fetches/fetches';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom'


export default function CreateListPage() {
    const history = useHistory()
    const [input, setInput] = useState();

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

    function handleOnChange(e) {

        setInput(e.target.value)
        console.log(input)
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
                    placeholder="Markdown"
                    className="input create-textarea"
                    id="create-todos-input"
                    onChange={handleOnChange}>
                </textarea>
                <ReactMarkdown className="markdown" >{input}</ReactMarkdown>
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
