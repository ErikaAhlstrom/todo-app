import React, {useState, useEffect} from 'react';
import { useHistory, Link } from "react-router-dom"; 

export default function EditListPage(props) {
    let history = useHistory()
    const list_id = props.match.params.id
    const [list, setList] = useState([]);
    const [textareaInput, setTextareaInput] = useState([]);

    useEffect(() => {
        getList();
    }, [])

    function handleOnChange(e) {

        let newList = {...list, [e.target.name]: e.target.value}
        setList(newList);
        
        setTextareaInput(newList.todos)
        console.log(list)
    }


    function getList() {
        fetch(`http://localhost:5000/lists/${list_id}`)
            .then(res => res.json())
            .then((data) => {
                setList(data)
                let input = data.todos.join("\r\n") 
                setTextareaInput(input)
            })
            .catch(err => console.log("Error: ", err))            
                
    }

    function handleEditList(title, todosArray) {
        const newList = {
            "user": "615712cf8eeaccf8d128b944",
            "title": title,
            "todos": todosArray
        }
        fetch((`http://localhost:5000/lists/update/${list_id}`), {
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
        <>
            <div className="listPage">
                <h1> Edit your note</h1>
                <div className="create-list">
                    <form onSubmit={handleSubmit}>
                        <div className="create-list-header">
                            <input 
                                value={list["title" || ""]}
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
                            value={textareaInput || ""}
                            onChange={handleOnChange}
                            className="create-textarea"
                            id="edit-todos-input"
                            required={true} >
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
        </>
    )
}
