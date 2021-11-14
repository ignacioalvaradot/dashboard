import React, { useState, useEffect } from 'react';
import './App.css';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.9:200/postura';
function App() {
  const [data, updateData] = useState([]);
  const socket = socketIOClient(ENDPOINT, {
    transports: ['websocket', 'polling'],
  });
  useEffect(() => {

    socket.on('SendMetrics', function(msg) {
      //el devices es para acceder a cada dispositivo por grupo y el channel define a cada integrante del devices/grupo
      updateData(msg.data.devices[0].channel[0].valor);
      console.log(data);
      
  }); 
  
   /*  socket.on('a', (a) => {
      updateData(a);
      console.log(data)
    }); */
  }, []);

  return (
    <div className='App'>
      <h1>La postura es  : {data}</h1>
    </div>
  );
}

export default App;