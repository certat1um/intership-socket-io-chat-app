const loginBtn = document.querySelector('.btn');

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const login = document.querySelector('.login').value.trim();
  const password = document.querySelector('.password').value.trim();

  if (!(login && password)) {
    return 0;
  }

  const response = await fetch(`/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((res) => res.json());

  if (response.toString().indexOf('401') !== -1) {
    localStorage.setItem('userToken', null);
    return window.location.replace('/error');
  }

  localStorage.setItem('userToken', response.token);
  window.location.replace('/rooms');
});
