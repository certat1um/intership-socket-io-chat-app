const sendMessageBtn = document.querySelector('.sendMessageBtn');
const chatMessages = document.querySelector('.chat-messages');
const inputMessage = document.querySelector('.inputMessage');
const leaveRoomBtn = document.querySelector('.leave-room-btn');
const usersList = document.querySelector('#users');

const roomID = document.querySelector('#room-name').dataset.id;

const socket = io('http://localhost:3000/');

(async () => {
  const userLogin = await getUserLogin(localStorage.getItem('userToken'));

  socket.emit('joinRoom', { userLogin, roomID });
})();

socket.on('msgToClient', (data) => {
  createMessage(data.msg, data.authorLogin, new Date(data.createdAt));
});

socket.on('joinedRoom', (userLogin) => {
  //createJoinAlert(userLogin);
});

socket.on('leftRoom', (userLogin) => {
  //createLeaveAlert(userLogin);
});

sendMessageBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const msg = inputMessage.value.trim();

  if (msg === '') {
    return 0;
  }

  const authorLogin = await getUserLogin(localStorage.getItem('userToken'));
  const msgData = {
    msg,
    authorLogin,
    roomID,
    connectionID: socket.id,
    createdAt: Date.now(),
  };

  inputMessage.value = '';
  socket.emit('msgToServer', msgData);
});

leaveRoomBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const userLogin = await getUserLogin(localStorage.getItem('userToken'));

  socket.emit('leaveRoom', { userLogin, roomID });
  window.location.replace('/rooms');
});

function addUserToList(userLogin) {
  const userContainer = document.createElement('li');
  userContainer.innerText = userLogin;

  usersList.appendChild(userContainer);
}

function removeUserFromList(userLogin) {
  const users = document.querySelectorAll('#users li');

  users.forEach((item) => {
    if (item.innerText === userLogin) {
      item.remove();
    }
  });
}

function createMessage(msg, userLogin, date) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');

  const metaContainer = document.createElement('p');
  metaContainer.classList.add('meta');
  metaContainer.innerText = userLogin;

  const timeSpan = document.createElement('span');
  const timeMinutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  timeSpan.innerText = `${date.getHours()}:${timeMinutes}`;

  const textContainer = document.createElement('p');
  textContainer.classList.add('text');
  textContainer.innerText = msg;

  metaContainer.appendChild(timeSpan);
  messageContainer.appendChild(metaContainer);
  messageContainer.appendChild(textContainer);
  chatMessages.appendChild(messageContainer);
}

function createJoinAlert(userLogin) {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');

  const textContainer = document.createElement('p');
  textContainer.classList.add('text');
  textContainer.innerText = `${userLogin} has been joined to chat!`;

  alertContainer.appendChild(textContainer);
  chatMessages.appendChild(alertContainer);
}

function createLeaveAlert(userLogin) {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');

  const textContainer = document.createElement('p');
  textContainer.classList.add('text');
  textContainer.innerText = `${userLogin} has been left chat`;

  alertContainer.appendChild(textContainer);
  chatMessages.appendChild(alertContainer);
}

async function getUserLogin(userToken) {
  const res = await fetch(`http://localhost:3000/chat/userToken/${userToken}`);
  return res.text();
}
