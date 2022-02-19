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
            <h1 className="header-1"> New note</h1>
            <div className="create-btn-container">
                <Link className="btn btn-secondary" to="/">
                    Back
                </Link>
                <input 
                    className="btn btn-success"
                    type="submit" 
                    value="Save" 
                />
            </div>
         <div className="create-list">
            <form onSubmit={handleSubmit}>
                <div className="create-list-header">
                    <label className="input-label" htmlFor="create-title-input">Title</label>
                    <input 
                        onChange={handleOnChange}
                        className="input create-title-input" 
                        type="text"
                        name="title"
                        required={true} 
                        id="create-title-input">
                    </input>
                </div>
                <label className="input-label" htmlFor='create-todos-input'>Content | Markdown</label>
                <textarea 
                    name="todos"
                    className="input create-textarea"
                    id="create-todos-input"
                    onChange={handleOnChange}>
                </textarea>
                <label className="input-label" htmlFor='create-todos-input'>Preview</label>

                <ReactMarkdown className="markdown" >{list.todos}</ReactMarkdown>
            
            </form>
        </div>
        </div>
    )
}
