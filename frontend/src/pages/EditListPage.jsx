import React, {useState, useEffect} from 'react';
import { useHistory, Link } from "react-router-dom"; 
import { getSingleListFetch, editSingleListFetch } from '../fetches/fetches'
import ReactMarkdown from 'react-markdown';


export default function EditListPage(props) {
    let history = useHistory()
    const list_id = props.match.params.id
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, [])

    function handleOnChange(e) {
        let newList = {...list, [e.target.name]: e.target.value}
        setList(newList);
    }


    async function getList() {
        try {
            const ListRes = await getSingleListFetch(list_id)
            setList(ListRes.data)
            
        } catch (err) {
            console.log("Error: ", err)
        }           
    }


    async function handleSubmit(e) {

        try {
            e.preventDefault();
            const newList = {
                title: list.title,
                todos: list.todos
            }
            await editSingleListFetch(list_id, newList)
            history.push("/")
            window.location.reload()
            
        } catch (err) {
            console.log("Error: ", err)
        } 
    }

    return (
        <>
            <div className="listPage">
                <h1 className="header-1">Edit your note</h1>
                <div className="create-list">
                    <form onSubmit={handleSubmit}>
                        <div className="create-list-header">
                            <input 
                                value={list?.title}
                                className="create-title-input" 
                                type="text"
                                name="title"
                                required={true} 
                                id="edit-title-input"
                                onChange={handleOnChange}>
                                </input>
                        </div>
                        <textarea 
                            name="todos"
                            value={list?.todos}
                            onChange={handleOnChange}
                            className="create-textarea"
                            id="edit-todos-input"
                            required={true} 
                            >
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
        </>
    )
}
