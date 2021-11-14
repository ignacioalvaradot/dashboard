import React, { useState, useEffect } from 'react';
import './App.css';
import areaChart from './Components/Graphs/AreaChart.js'
import MultilineChart from './Components/Graphs/MultilineChart.js'
import PieChart from './Components/Graphs/PieChart.js'
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
const ENDPOINT = 'http://192.168.1.9:200/tiempohabla';

const data1 = [{"date":0,"value":59.48873313559879},{"date":1,"value":59.54980074047684},{"date":2,"value":9.12797559978733},{"date":3,"value":6.502075471853308},{"date":4,"value":65.2458981139046}] 

function App() {
  const [data, updateData] = useState([]);
  const socket = socketIOClient(ENDPOINT, {
    transports: ['websocket', 'polling'],
  });
   useEffect(() => {

    socket.on('SendMetrics', function(msg) {
      //el devices es para acceder a cada dispositivo por grupo y el channel define a cada integrante del devices/grupo
      //updateData(msg.data.devices[0].channel[0].valor);
      //updateData(msg.data.devices[0].channel[0]);
      //updateData(currentData => [...currentData,msg.data.devices[0].channel[0]]);
      updateData(msg.data.devices[0].channel);

      console.log(msg.data.devices[0].channel)
      
  }); 
  
    
  }, []); 
  //console.log(data)
  return (
    <div className='App'>
     {/*  <h1>La postura es  : {data}</h1>
      <MultilineChart/> */}

{/*  <LineChart width={500} height={300} data={data}>
        <XAxis />
        <YAxis />
        <Line dataKey="numeroInterv" />
      </LineChart>  */}

<PieChart
          data={data}
          width={200}
          height={200}
          innerRadius={0}
          outerRadius={100}
        />


    </div>
  );
}

export default App;