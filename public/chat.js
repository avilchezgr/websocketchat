// al importar en el index.html /socket.io/socket.io.js tenemos accesible ent todo el html la variable io

//normalmente voy a necesitar poner la url dentro de io() pero como sirvo el html desde el back el propio io reconoce la url
const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
btn.addEventListener('click', () => {
  console.log({username: username.value, message: message.value });
  socket.emit('chat:message', { message: message.value, username: username.value });
});

message.addEventListener('keypress', () => {
  socket.emit('chat:typing', username.value);
})

socket.on('chat:message', (data) => {
  actions.innerHTML = '';
  output.innerHTML += `
  <p>
    <strong>
      ${data.username}
    </strong>
      ${data.message}
  </p>
  `
});

socket.on('chat:typing', (data) => {
  actions.innerHTML= `<p><em>${data} is typing a message </em></p>`
})