import React, { useState, useEffect } from "react";
import NetworkSpeechGraph from "../Graphs/NetworkSpeechGraph";
import PieChart from "../Graphs/PieChart";
import MultilineGraph from "../Graphs/MultilineGraph";
import StackedBarChart from "../Graphs/StackedBarChart";
import NestedpieChart from "../Graphs/NestedpieChart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import socketIOClient from "socket.io-client";
import Slider from '@mui/material/Slider';
import CircleIcon from '@mui/icons-material/Circle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux'
import {obtenerMetricasAccion} from '../../redux/metricasDucks'

const ENDPOINT = "http://192.168.1.2:200/tiempohabla";
const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling"],
});

const theme = createTheme({
  palette: {
    directo: {
      // Purple and green play nicely together.
      main: '#aa2e25',
    },
    retrocede: {
      // This is green.A700 as hex.
      main: '#757575',
    },
  },
});


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  width: "100%",
  fontSize: "18px",
  backgroundColor: "white",
  paddingBlock: "5%",
  justifyContent: "flex-start",
  color: "black",
  fontWeight: "normal",
  margin: "0px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  lineHeight: "21px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

var datas = [];

const Habla = () => {
  const dispatch = useDispatch()
  const metricasHabla = useSelector(store => store.metricaHabla.array)
  const [data, updateData] = useState([]);
  const [finaldata, setFinaldata] = useState([]);
  const [slidedata, setSlidedata] = useState([]);
  const [value, setValue] = useState(0);
  const [estado, setEstado] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [colorButton, setColorButton] = useState("directo");
  const handleClose = () => setSelectedItem(null);

  const slideChange = (event, newValue) => {
    setValue(newValue);
    setSlidedata(datas[value])
    setEstado(true)
    setColorButton("retrocede")
    console.log(value)
    console.log(slidedata)

  };

  const tick = () => {
    //datas.push(data)
    setFinaldata(data);
    if (estado == false){
    setValue(datas.length);
    setSlidedata(datas[value])
    }
    //console.log(datas)
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    //setValue(value + 1);
    //setSlidedata(datas[value])
    return () => {
      clearInterval(interval);
    };
  }, [finaldata]);

  useEffect(() => {
    
    socket.on("SendMetrics", (msg) => {
      updateData(msg.data.devices);
      //dispatch(obtenerMetricasAccion(msg.data.devices))
      datas.push(msg.data.devices)
    });
    return () => {
      updateData({}); 
    };
  }, []);
  return (
    <div >
    <Grid container justifyContent="center" m={1} >
     <Grid container justifyContent="center" m={1}>
        <Box  width={700} >
      <Slider aria-label="Volume" value={value} onChange={slideChange} max={(datas.length) - 1} /> 
      
    </Box>
    <Box ml = {3}>
    <ThemeProvider theme={theme}>
    <Button onClick={() => (setEstado(false), setColorButton("directo"))} variant="outlined" startIcon={<CircleIcon />} color={colorButton}> En directo</Button>
    </ThemeProvider>
    </Box>
    
    <IconButton color="primary">
    <PlayArrowIcon />
</IconButton>

<IconButton color="primary" onClick={() => (setEstado(true), setSlidedata(datas[value]))}>
    <PauseIcon />
</IconButton>

    </Grid>
    {slidedata &&
    slidedata.map((canales, i) => (
      <div key={i}>
      
        <Grid item xs={2.3} mr={6} key={i}>
          <h2
            style={{ textAlign: "center", width: "100%", marginLeft: "100px"}}
          >
            {" "}
            Grupo {i + 1}
          </h2>
          <div style={{ textAlign: "center" }}>
            <Button
              sx={{ width: "270px", height: "270px" }}
              onClick={() => {
                setSelectedItem(i);
              }}
            >
              {" "}
              <NetworkSpeechGraph data={canales}> </NetworkSpeechGraph>{" "}
            </Button>
          </div>
          <Modal
            open={selectedItem === i}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={style2}> Gráfico detallado habla </div>
              <Grid container spacing={7}>
              <Grid item xs={5}px={5} py={2}>
              <PieChart
                data={canales}
                width={270}
                height={270}
                innerRadius={0}
                outerRadius={100}
              > 
              </PieChart>
              </Grid> 
                {/*  <Grid item xs={4}  px={6} py={2}>
              <MultilineGraph data={canales}></MultilineGraph></Grid>   */}
                   <Grid item xs={5}  px={5} py={2}>
              <StackedBarChart data={canales}></StackedBarChart></Grid>  

               {/* <Grid item xs={5}  px={5} py={2}>
              <NestedpieChart data={canales}></NestedpieChart></Grid>     */} 
              </Grid>
              
            </Box>
          </Modal>
        </Grid>
      
      </div>
    ))}
    
  </Grid>

    </div>
  );
};

export default Habla;