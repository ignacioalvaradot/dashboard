import React, { useState, useEffect } from 'react';
import './App.css';
import areaChart from './Components/Graphs/AreaChart.js'
import MultilineChart from './Components/Graphs/MultilineChart.js'
import PieChart from './Components/Graphs/PieChart.js'
import NetworkGraph from './Components/Graphs/NetworkGraph.js'
import NetworkGraph2 from './Components/Graphs/NetworkGraph2.js'
import Box from '@mui/material/Box';

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

const data1 = [{"date":0,"value":59.48873313559879},{"date":1,"value":59.54980074047684},{"date":2,"value":9.12797559978733},{"date":3,"value":6.502075471853308},{"date":4,"value":65.2458981139046}] 

function App() {
  const [data, updateData] = useState([]);
  const[onClick,setOnclick] = useState(false);
  


  
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
    <div className='App'>
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
   {data.map(canales => (   

    
      
    
   <NetworkGraph2 data={canales.channel} ></NetworkGraph2> 
   
   
   
                                ))}
    


    </div>
  );
}

export default App;