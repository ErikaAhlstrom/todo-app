import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom"; 
import { createListFetch } from '../fetches/fetches';
import ReactMarkdown from 'react-markdown';


export default function CreateListPage() {
    const history = useHistory()
    const [list, setList] = useState([]);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const newList = {
                title: list.title, 
                todos: list.todos}
            await createListFetch(newList)
            history.push("/")
            window.location.reload()
            
        } catch (err) {
            console.log("Error: ", err)
        } 
    }

    function handleOnChange(e) {
        let newList = {...list, [e.target.name]: e.target.value}
        setList(newList);
    }

    return (
        <div className="listPage">
            <h1 className="header-1"> Add new note</h1>
         <div className="create-list">
            <form onSubmit={handleSubmit}>
                <div className="create-list-header">
                    <input 
                        onChange={handleOnChange}
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
                <ReactMarkdown className="markdown" >{list.todos}</ReactMarkdown>
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
