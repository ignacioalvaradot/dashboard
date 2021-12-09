import React, { useState, useEffect } from 'react';
import NetworkGraph2 from './../Graphs/NetworkGraph2'
import NetworkMultiGraph from './../Graphs/NetworkMultiGraph'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://192.168.1.13:200/multimetrica';


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
  const [dataHabla, updateDataHabla] = useState([]);
  const [finaldata, setFinaldata] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleClose = () => setSelectedItem(null); 

  const tick = () => {
    setFinaldata(dataHabla)

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
      //el devices es para acceder a cada dispositivo por grupo y el channel define a cada integrante del devices/grupo
      updateDataHabla(msg.data.devices);
     // console.log(msg.data.devices)
      
  }); 
  
  
  }, []); 
  
  return (
    <div >
<Grid container justifyContent="center" m={1}>
     {dataHabla.map((canales,i) => (   
      <Grid  sx= {{border: "2px solid red"}}item xs={2.3}  mr={6} key={i} >
     <><Button onClick={()=> {
      setSelectedItem(i);
    }}>  <NetworkMultiGraph data = {canales} > </NetworkMultiGraph> </Button><Modal
       open={selectedItem === i}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style} >
     <NetworkGraph2 data={canales}></NetworkGraph2>
       </Box>
     </Modal>
     
     </>
     </Grid>
      
                                ))}  
    </Grid>
                                     
    </div>
  );
}

export default Multimetrica;