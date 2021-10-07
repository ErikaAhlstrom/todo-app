import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import ListPage from './pages/ListPage';
import CreateListPage from './pages/CreateListPage';
import EditListPage from './pages/EditListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE = "http://localhost:5000"
function App() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
  }, [])

  const getLists = () => {
    fetch(API_BASE + "/lists")
      .then(res => res.json())
      .then((data) => {
        setLists(data)
      })
      .catch(err => console.log("Error: ", err))
  }

  return (
    <div className="app">
      <Switch>

        <Route path="/list/create">
          <CreateListPage></CreateListPage>
        </Route>

        <Route path="/list/edit/:id" component={EditListPage}>
        </Route>

        <Route path="/login" >
          <LoginPage></LoginPage>
        </Route>
        
        <Route path="/register" >
          <RegisterPage></RegisterPage>
        </Route>

        <Route path="/">
          <ListPage lists={lists}></ListPage>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
