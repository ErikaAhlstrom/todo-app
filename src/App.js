
function App() {
  return (
    <div className="app">
      <h1> Welcome, Erika </h1>
      <div className="lists-header">
        <h2>Your Notes</h2>
        <a className="btn new-note-btn">New Note</a>
      </div>
      <div className="lists-container">
        
        <div className="list">
          <div className="list-header">
            <h4>Todo Today</h4>
            <div className="list-action-btns">
              <a className= "list-edit-btn" href="#"><i class='bx bx-edit-alt'></i></a>
              <a className= "list-delete-btn" href="#"><i class='bx bx-trash'></i></a>
            </div>
          </div>
          <div className="todo is-complete">
            <div className="checkbox"></div>
            <div className="text">Go for a run</div>
          </div>
          <p className="list-date">2021-03-12</p>
        </div>

        <div className="list">
          <div className="list-header">
            <h4>Todo Today</h4>
            <div className="list-action-btns">
              <a className= "list-edit-btn" href="#"><i class='bx bx-edit-alt'></i></a>
              <a className= "list-delete-btn" href="#"><i class='bx bx-trash'></i></a>
            </div>
          </div>
          <div className="todo is-complete">
            <div className="checkbox"></div>
            <div className="text">Go for a run</div>
          </div>
          <p className="list-date">2021-03-12</p>
        </div>

      </div>
    </div>
  );
}

export default App;
