//import { auth } from './auth';

const loginBtn = document.querySelector('.btn');

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const login = document.querySelector('.login').value.trim();
  const password = document.querySelector('.password').value.trim();
  
  //auth(login, password, 'login');
  if(!(login && password)) {
    return 0;
  }

  const response = await fetch(`/login`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "login": login,
      "password": password,
    }),
  }).then(res => res.text());

  if(response.indexOf('401') !== -1) {
    localStorage.setItem('userToken', null);
    return window.location.replace('/error');
  }

  localStorage.setItem('userToken', response);
  return window.location.replace('/rooms');
});