import React from 'react'

export default function NewListPage() {

    function handleCreateList(title, todosArray) {
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
            .then(res => console.log(res))
            .catch(err => console.log("Error: ", err))
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
         <div className="create-list">
             <form onSubmit={handleSubmit}>
          <div className="create-list-header">
              <input 
                placeholder="Title" 
                className="create-title-input" 
                type="text"
                name="title"
                required="true" 
                id="create-title-input">
                </input>
          </div>
            <textarea 
                name="todos"
                placeholder="Todos..."
                className="create-textarea"
                id="create-todos-input"
                required="true" >
            </textarea>
            <input 
                className="btn"
                type="submit" 
                value="Save" />
          </form>
        </div>
    )
}
