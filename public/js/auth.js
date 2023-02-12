export const auth = async (login, password, url) => {
  if(!(login && password)) {
    return 0;
  }

  const response = await fetch(`/${url}`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "login": login,
      "password": password,
    }),
  });
  
  const textResponse = await response.text(); // Token || Unathourized error

  if(textResponse.indexOf('401') !== -1) {
    localStorage.setItem('userToken', null);
    return window.location.replace('/error');
  }

  localStorage.setItem('userToken', textResponse);
  return window.location.replace('/rooms');
};