import React, {useState, useEffect} from 'react';
import socketIO from 'socket.io-client';


function Sock() {
   const [textData, setTextData] = useState([]);
   const [data1, setData1] = useState(0);

  console.log("hola mundo")
  let socket = null;

  function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
      socket = socketIO('http://192.168.1.9:200/postura');
      /* socket.on('SendMetrics', function(msg) {
        console.log('SendMetrics', msg);
    }); */
    socket.on('SendMetrics', (msg) => {

      Object.keys(msg).forEach(function(key) {
        var value = msg[key];
        console.log(value)
        // ...
    });
    
      let data = msg;
      //console.log(data["metadata"]);
      
  });
    }


  return (
      
    
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
        
      </form>

    );
        
}

export default Sock;