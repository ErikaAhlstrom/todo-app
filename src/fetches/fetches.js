import axios from 'axios';

axios.defaults.withCredentials = true;
// const url = axios.create({ baseURL: 'http://localhost:5000/' });
const url = axios.create({ baseURL: 'https://evil-dungeon-89976.herokuapp.com' });


/////// USER ////////
export const editUser = (payload) => url.post('users/update', payload);
export const getLoggedInFetch = () => url.get('users/loggedIn');
export const getCurrentUserFetch = () => url.get('users/current');
export const logoutUserFetch = () => url.get('users/logout');
export const loginUserFetch = (payload) => url.post('users/login', payload);
export const registerUserFetch = (payload) => url.post('users/register', payload);


/////// LIST ////////
export const getSingleListFetch = (listId) => url.get(`lists/${listId}`);
export const editSingleListFetch = (listId, payload) => url.post(`lists/update/${listId}`, payload);
export const createListFetch = (payload) => url.post('lists/add', payload);
export const deleteListFetch = (listId) => url.delete(`lists/${listId}`);
export const getListsForOneUserFetch = () => url.get('lists');

