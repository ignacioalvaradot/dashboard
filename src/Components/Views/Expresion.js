import React, { useState, useEffect } from 'react';
import NetworkExpGraph from './../Graphs/NetworkExpGraph'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.13:200/expresiones';
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

const Expresion = () => {
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
  }); 
  return () => {
    updateData({}); // This worked for me
  };
  }, []); 
  return (
    <div>
 <Grid container justifyContent="center" m={1}>
     {data.map((canales,i) => (   
      <Grid  sx= {{border: "2px solid red"}}item xs={2.3}  mr={6} key={i} >
     <><Button onClick={()=> {
      setSelectedItem(i);
    }}> <NetworkExpGraph data = {canales}> </NetworkExpGraph>  </Button><Modal
       open={selectedItem === i}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style} >
       <NetworkExpGraph data = {canales}> </NetworkExpGraph>
       </Box>
     </Modal>
     
     </>
     </Grid>
                                ))}  
    </Grid>
                        
    </div>
  );
}

export default Expresion;