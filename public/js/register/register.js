const registerBtn = document.querySelector('.registerBtn');

registerBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const login = document.querySelector('.login').value.trim();
  const password = document.querySelector('.password').value.trim();

  if (!(login && password)) {
    return 0;
  }

  const response = await fetch(`/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  }).then((res) => res.json());

  localStorage.setItem(`userToken-${response.id}`, response.token);
  window.location.replace('/rooms');
});
