import React, { useState, useEffect } from 'react';
import NetworkGraph2 from './../Graphs/NetworkGraph2'
import NetworkSpeechGraph from './../Graphs/NetworkSpeechGraph'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.12:200/tiempohabla';
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

const Multimetrica = () => {
  const [data, updateData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState([]);
  const [finaldata, setFinaldata] = useState([]);

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
  
    
  }, []); 
  return (
    <div >
 
     {data.map(canales => (   

     <><Button onClick={()=> {
      setModalData(canales);
      setOpen(true);
    }}> {/* <FinalGraph data = {canales}> </FinalGraph> */}  <NetworkSpeechGraph data = {canales}> </NetworkSpeechGraph>  </Button><Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style} >
       <NetworkSpeechGraph data = {modalData}> </NetworkSpeechGraph>
       </Box>
     </Modal>
     
     </>
                                ))}  
                        
    </div>
  );
}

export default Multimetrica;