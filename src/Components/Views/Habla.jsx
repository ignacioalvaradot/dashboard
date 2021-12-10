import React, { useState, useEffect } from 'react';
import NetworkGraph2 from './../Graphs/NetworkGraph2'
import NetworkSpeechGraph from './../Graphs/NetworkSpeechGraph'
import PieChart from './../Graphs/PieChart'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.13:200/tiempohabla';
const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket', 'polling'],
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Habla = () => {
  const [data, updateData] = useState([]);
  const [finaldata, setFinaldata] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleClose = () => setSelectedItem(null); 

  const tick = () => {
    setFinaldata(data)

  }

  useEffect(() => {
    const interval = setInterval(tick,4000)
    //console.log("data final",finaldata)
    return() => {
      clearInterval(interval)
    }


  }, [finaldata])
  

  
   useEffect(() => {
     

    socket.on('SendMetrics', msg => {
      updateData(msg.data.devices);
      //console.log(msg.data.devices)
      
  }); 
  return () => {
    updateData({}); // This worked for me
  };
    
  }, []); 
  return (
    <div >
 <Grid container justifyContent="center" m={1}>
     {data.map((canales,i) => (   
      <Grid item xs={2.3}  mr={6} my = {3} key={i} >
     <><Button onClick={()=> {
      setSelectedItem(i);
      
    }}>  <NetworkSpeechGraph data = {canales}> </NetworkSpeechGraph>  </Button>

    
    
    <Modal
       open={selectedItem === i}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style} >
       
       <PieChart data = {canales} 
          width={270}
          height={270}
          innerRadius={0}
          outerRadius={100} > </PieChart>
         
       </Box>
       
     </Modal>
     </>
     </Grid>

                                ))}  
          </Grid>
                        
    </div>
  );
}

export default Habla;