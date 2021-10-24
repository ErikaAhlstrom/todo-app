import axios from 'axios';

axios.defaults.withCredentials = true;
const url = axios.create({ baseURL: 'http://localhost:5000/' });


/////// USER ////////
export const editUser = (payload) => url.post('users/update', payload);
export const getLoggedInFetch = () => url.get('auth/loggedIn');
export const logoutUserFetch = () => url.get('auth/logout');
export const loginUserFetch = (payload) => url.post('auth/login', payload);
export const registerUserFetch = (payload) => url.post('auth', payload);


/////// LIST ////////
export const getSingleListFetch = (listId) => url.get(`lists/${listId}`);
export const editSingleListFetch = (listId, payload) => url.post(`lists/update/${listId}`, payload);
export const createListFetch = (payload) => url.post('lists/add', payload);
export const deleteListFetch = (listId) => url.delete(`lists/${listId}`);
export const getListsForOneUserFetch = () => url.get('lists');

