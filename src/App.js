import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import ListPage from './pages/ListPage';
import NewListItem from './pages/NewListPage';

const API_BASE = "http://localhost:3000"
function App() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getTodos();
    console.log(lists)
  }, [])

  const getTodos = () => {
    fetch(API_BASE + "/lists")
      .then(res => res.json())
      .then((data) => {
        setLists(data)
        console.log(data)
      })
      .catch(err => console.log("Error: ", err))
  }

  return (
    <div className="app">
      <Switch>

        <Route path="/list/new">
          <NewListItem></NewListItem>
        </Route>

        <Route path="/">
          <ListPage lists={lists}></ListPage>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
