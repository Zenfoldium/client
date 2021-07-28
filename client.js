const socket = io('https://chatwithdude.herokuapp.com/');

const form =  document.getElementById('send-container');
const messageinp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".msgcont")
var audio = new Audio('notification.mp3')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
})

const name_ = prompt("Enter your name to join");
socket.emit('new-user-joined', name_);

socket.on('user-joined', name_ =>{
    if(name_!=null){
    append(`${name_} joined the chat`, 'right')}
})

socket.on('recieve', data =>{
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})
