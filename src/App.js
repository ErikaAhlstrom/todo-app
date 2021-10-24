import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import ListPage from './pages/ListPage';
import CreateListPage from './pages/CreateListPage';
import EditListPage from './pages/EditListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './context/AuthContext';
import { getLoggedInFetch, getListsForOneUserFetch } from './fetches/fetches'

function App() {

const [loggedIn, setLoggedIn] = useState(undefined);
const [lists, setLists] = useState([]);

useEffect(() => {
  getLists();
  getLoggedIn();
}, [])

  async function getLoggedIn() {
      const loggedInRes = await getLoggedInFetch()
      setLoggedIn(loggedInRes.data);
    }

  async function getLists() {
      const getListsRes = await getListsForOneUserFetch()
      setLists(getListsRes.data);
    }


  return (
    <div className="app">
      <AuthContext.Provider value={{loggedIn, setLoggedIn, getLoggedIn}}>
      <Switch>

        {loggedIn === false && (
          <>
        <Route path="/login" >
          <LoginPage></LoginPage>
        </Route>   
       
        <Route path="/register" >
          <RegisterPage></RegisterPage>
        </Route>

         <Route exact path="/">
            <LoginPage></LoginPage>
          </Route>
          </>
        )}

        {loggedIn === true && (
          <>
          <Route path="/list/create" component={CreateListPage}>
          </Route>

          <Route path="/list/edit/:id" component={EditListPage}>
          </Route>

          <Route exact path="/">
            <ListPage lists={lists}></ListPage>
          </Route>
          </>
        )}


      </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
