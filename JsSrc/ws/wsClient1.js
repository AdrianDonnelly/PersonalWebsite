 // Create WebSocket connection.
 const socket = new WebSocket('ws://172.20.10.5:5500');


 // Connection opened
 socket.addEventListener('open', function (event) {
     console.log('Connected to WS Server')
 });

 // Listen for messages
 socket.addEventListener('message', function (event) {
     console.log('Message from server ', event.data);
 });

 const sendMessage = () => {
     socket.send('Hello From Client1!');
 }