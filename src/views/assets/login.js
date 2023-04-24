import HOST_URL from './main.js';

// LOGIN VARIABLES
const email = document.getElementById('email');
const password = document.getElementById('password');

// LOGIN VARIABLES
const login_progress = document.getElementById('login-progress');
const login_sucess = document.getElementById('login-success');
const seller_login_progress = document.getElementById('seller-login-progress');

// VARIABLES TO PASS IN CHAT ROOM
let user = {};

// INITIATE SOCKET
// eslint-disable-next-line no-undef
const socket = io();

// FORM VARIABLES
const login_form = document.getElementById('login-form');

// HANDLE LOGIN
login_form.addEventListener('submit', (e) => {
  e.preventDefault();
  // ASSIGN VARIABLES
  const userLogin = {
    email: email.value,
    password: password.value,
  };
  // SHOW LOGIN PROGRESS
  login_progress.style.display = 'block';
  login_sucess.style.display = 'none';
  seller_login_progress.style.display = 'none';
  // FETCH API
  fetch(`${HOST_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  })
    .then(async (res) => {
      login_progress.style.display = 'none';
      // HANDLE RESPONSE
      if (res.status === 200) {
        login_sucess.style.display = 'block';
        const data = await res.json();
        user = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image:
            'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png',
        };
        // SEND MESSAGE TO SERVER
        socket.emit('userLogin', user);
        // SET COOKIE
        document.cookie = `cookie=${data.Authorization}; Path=/`;
        // STORE USER IN LOCAL STORAGE
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          window.location.href = './chat.html';
        }, 1000);
      }
      if (res.status === 202) {
        seller_login_progress.style.display = 'block';
        const data = await res.json();
        const { token } = data;
        fetch(`${HOST_URL}/users/login/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (res) => {
          if (res.status === 200) {
            seller_login_progress.style.display = 'none';
            login_sucess.style.display = 'block';
            const sellerData = await res.json();
            user = {
              id: sellerData.user.id,
              name: sellerData.user.name,
              email: sellerData.user.email,
              image:
                'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png',
            };
            // SEND MESSAGE TO SERVER
            socket.emit('userLogin', user);
            // SET COOKIE
            document.cookie = `cookie=${data.Authorization}; Path=/`;
            // STORE USER IN LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
              window.location.href = './chat.html';
            }, 1000);
          }
        });
      }
    })
    .catch((err) => {
      /*eslint-disable*/
      console.log(err);
      login_progress.style.display = 'none';
      login_sucess.style.display = 'none';
    });
});
