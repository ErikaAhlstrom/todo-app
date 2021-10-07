import React, {useState, useEffect, useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import ListPage from './pages/ListPage';
import CreateListPage from './pages/CreateListPage';
import EditListPage from './pages/EditListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext';
import AuthContext from "./context/AuthContext";

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
  
  
  const {loggedIn} = useContext(AuthContext);
  console.log("App.js", {loggedIn});

  return (
    <div className="app">
      <AuthContextProvider>
      <Switch>

        <Route path="/login" >
          <LoginPage></LoginPage>
        </Route>   
       
        <Route path="/register" >
          <RegisterPage></RegisterPage>
        </Route>

        <Route path="/list/create">
          <CreateListPage></CreateListPage>
        </Route>

        <Route path="/list/edit/:id" component={EditListPage}>
        </Route>

        <Route path="/">
          <ListPage lists={lists}></ListPage>
        </Route>

      </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
