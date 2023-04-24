import HOST_URL from './main.js';

// READ USER FROM LOCAL STORAGE
const loggedInUser = JSON.parse(localStorage.getItem('user'));
// eslint-disable-next-line no-console
console.log(loggedInUser);

// IF A USER IS NOT LOGGEDIN REDIRECT TO LOGIN PAGE
if (!loggedInUser) {
  window.location.href = './index.html';
}

// GLOBAL VARIABLES
const chatbox = document.getElementById('chatbox');

// GLOBAL FEEDBACK VARIABLES
const logging_out = document.getElementById('logging-out');
const user_connected_container = document.querySelector(
  '.user-connected-container'
);

// eslint-disable-next-line no-undef
const socket = io();

/**
 *
 * DISPLAY FUNCTIONS
 */
// MESSAGE VARIABLES
// DISPLAY USER MESSAGE
async function displayMessage(messageResponse) {
  // eslint-disable-next-line
  console.log(messageResponse);
  const messageList = document.getElementById('message-list');
  const { user, messageBody, createdAt } = messageResponse;
  const li = document.createElement('li');
  li.classList.add('message');
  // eslint-disable-next-line
  user.email === loggedInUser.email
    ? li.classList.add('owner')
    : li.classList.add('other');
  li.innerHTML = `
<img src=${loggedInUser.image} alt="" class="message-icon">
<section class="message-details">
<p class="message-body">
${messageBody}
</p>
<span class="message-meta">
<p class="message-sender">${user.name}</p>
<p class="message-time">${createdAt}</p>
</span>
</section>
`;
  messageList.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// USER VARIABLES
const userList = document.getElementById('users-list');
// DISPLAY USER LIST
const displayUserList = (users) => {
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild);
  }
  users.forEach((user) => {
    const {
      user: { name },
    } = user;
    const li = document.createElement('li');
    li.classList.add('user-list-item');
    li.innerHTML = `
  <a href="#" class="user-list-link">${name}</a>
  `;
    userList.appendChild(li);
  });
  // eslint-disable-next-line no-console
  console.log(users);
};

// GET ACTIVE USERS
socket.on('activeUsers', (users) => {
  displayUserList(users);
});

// CATCH USERS FROM SERVER
socket.on('users', (users) => {
  displayUserList(users);
});

socket.on('message', (message) => {
  // eslint-disable-next-line no-console
  console.log(message);
});

socket.on('serverMessages', (messages) => {
  messages.forEach((message) => {
    displayMessage(message);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // SEND MESSAGE TO SERVER
  socket.emit('joinChat', loggedInUser);
  // SCROLL TO LAST MESSAGE
  chatbox.addEventListener('load', () => {
    // SCROLL TO LAST MESSAGE
    chatbox.scrollTop = chatbox.scrollHeight;
  });
});

// HANDLE LOGOUT
const logout = document.getElementById('leave-chat');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  // CATCH COOKIE AND SEND IT TO SERVER
  const { cookie } = document;
  // SHOW LOGOUT PROGRESS
  logging_out.style.display = 'block';
  fetch(`${HOST_URL}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${cookie}}`,
    },
  })
    .then(async (res) => {
      // HANDLE RESPONSE
      if (res.status === 200) {
        // REMOVE USER FROM LOCAL STORAGE
        localStorage.removeItem('user');
        // DESTROY COOKIE
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
        // SEND MESSAGE TO SERVER
        socket.emit('leave', loggedInUser);
        // REDIRECT TO LOGIN PAGE
        setTimeout(() => {
          window.location.href = './index.html';
          logging_out.style.display = 'none';
        }, 1000);
      }
    })
    .catch((err) => {
      /*eslint-disable*/
      console.log(err);
    });
});

// HANDLE SEND MESSAGE
const send = document.getElementById('send-button');
send.addEventListener('click', (e) => {
  e.preventDefault();
  // GET MESSAGE FROM INPUT
  let message = document.getElementById('message');
  const messagePayload = {
    message: message.value,
    loggedInUser,
  };
  message.value = '';
  // SEND MESSAGE TO SERVER
  socket.emit('createMessage', messagePayload);
});

  // GET MESSAGE FROM SERVER
  socket.on('newMessage', (message) => {
    displayMessage(message);
  });

// BROADCAST NEW USER TO OTHER USERS
socket.on('newUser', (user) => {
  const {
    user: { name },
  } = user;
  // eslint-disable-next-line no-console
  console.log(name);
  const user_connected = document.createElement('p');
  user_connected.setAttribute('id', 'user-connected');
  user_connected.style.display = 'block';
  user_connected.innerHTML = `
      ${name} has joined the chat
  `;
  user_connected_container.appendChild(user_connected);
  setTimeout(() => {
    user_connected.style.display = 'none';
  }, 3000);
});
