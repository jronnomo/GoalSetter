import axios from 'axios';

//added a proxy setting to frontend/package.json to include http://localhost:5000 proxy
const API_URL = '/api/users/';

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  //axios sends its response in an object called 'data'
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Register user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  //axios sends its response in an object called 'data'
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
