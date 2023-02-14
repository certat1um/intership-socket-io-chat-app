const sendMessageBtn = document.querySelector('.sendMessageBtn');
const chatMessages = document.querySelector('.chat-messages');
const inputMessage = document.querySelector('.inputMessage');

const socket = io('http://localhost:3000/');

socket.on('msgToClient', async (msg) => {
  const username = await getUserName(localStorage.getItem('userToken'));
  const dateNow = new Date();

  sendMessage(msg, username, dateNow);
  // then post this message to database (we have socket.id, username, msg, dateNow) and we need roomID
});

sendMessageBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const msgValue = inputMessage.value.trim();

  if (msgValue === '') {
    return 0;
  }

  inputMessage.value = '';
  socket.emit('msgToServer', msgValue);
});

function sendMessage(msg, authorLogin, date) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');

  const metaContainer = document.createElement('p');
  metaContainer.classList.add('meta');
  metaContainer.innerText = authorLogin;

  const timeSpan = document.createElement('span');
  timeSpan.innerText = `${date.getHours()}:${date.getMinutes()}`;

  const textContainer = document.createElement('p');
  textContainer.classList.add('text');
  textContainer.innerText = msg;

  metaContainer.appendChild(timeSpan);
  messageContainer.appendChild(metaContainer);
  messageContainer.appendChild(textContainer);
  chatMessages.appendChild(messageContainer);
}

async function getUserName(userToken) {
  const res = await fetch(`http://localhost:3000/chat/userToken/${userToken}`);

  const token = await res.text();

  return token;
}
