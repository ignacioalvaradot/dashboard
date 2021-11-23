import React, { useState, useEffect } from 'react';
import './App.css';
import areaChart from './Components/Graphs/AreaChart.js'
import MultilineChart from './Components/Graphs/MultilineChart.js'
import PieChart from './Components/Graphs/PieChart.js'
import NetworkGraph from './Components/Graphs/NetworkGraph.js'
import NetworkGraph2 from './Components/Graphs/NetworkGraph2.js'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ForceNetworkGraph from './Components/Graphs/ForceNetworkGraph.js'
import Boxes from './Components/Boxes.js'
import InteractionGraph from './Components/Graphs/InteractionGraph.js'


import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

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

function App() {
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
      //el devices es para acceder a cada dispositivo por grupo y el channel define a cada integrante del devices/grupo
      //updateData(msg.data.devices[0].channel[0].valor);
      //updateData(msg.data.devices[0].channel[0]);
      //updateData(currentData => [...currentData,msg.data.devices[0].channel[0]]);
      //updateData(msg.data.devices[0].channel); Sirve para los nodos
      updateData(msg.data.devices);
      console.log(msg.data.devices)
      
  }); 
  
    
  }, []); 
  //console.log(data)
  return (
    <div >
      {/* <MultilineChart/>  */}

{/*  <LineChart width={500} height={300} data={data}>
        <XAxis />
        <YAxis />
        <Line dataKey="numeroInterv" />
      </LineChart>  */}

{/*  <PieChart
          data={data}
          width={200}
          height={200}
          innerRadius={0}
          outerRadius={100}
        />  */}

   {/* <NetworkGraph data={data}></NetworkGraph>  */}
   {/* <NetworkGraph2 data={data} ></NetworkGraph2>  */}
   
   {/* El mapeo crea un componente por dispositivo, donde la funcion flecha apunta al dato que quiero graficar */}
  {/*  <Boxes></Boxes> */}
   {/* <ForceNetworkGraph data ={data}> </ForceNetworkGraph> */}
    
    {/* <InteractionGraph data={data} ></InteractionGraph> */}

    {data.map(canales => (   

    
      
     <><Button onClick={()=> {
      setModalData(canales);
      setOpen(true);
    }}>Open modal</Button><Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style} >
     <NetworkGraph2 data={modalData.channel}></NetworkGraph2>
       </Box>
     </Modal>{/* <NetworkGraph2 data={canales.channel}></NetworkGraph2> */}
     <InteractionGraph data={canales.channel} ></InteractionGraph>
     </>
   
   
   
   
                                ))} 
                        
    


    </div>
  );
}

export default App;