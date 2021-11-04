// bu metodu localStorage tokeni gönderip çağırdığımızda token varsa hem request headersa hem de localStorage ekler yoksa yani boş gönderirsek siler - logout sırasında vs

// bu metodu aynı zamanda App.js içerisinde de çağırıyoruz ki uygulama her başladığında token varsa set etsin

import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
