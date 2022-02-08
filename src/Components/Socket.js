import socketIOClient from "socket.io-client";
import {useDispatch} from 'react-redux';
import {obtenerMetricasAccion,obtenerMetricasExpresionesAccion, obtenerMetricasPosturasAccion} from '../redux/metricasDucks';
import { useEffect } from "react";

//ENDPOINTS
const ENDPOINT_HABLA = "http://192.168.1.2:200/tiempohabla";
const ENDPOINT_EXPRESIONES= "http://192.168.1.2:200/expresiones";
const ENDPOINT_POSTURA = "http://192.168.1.2:200/postura";

const socketHabla = socketIOClient(ENDPOINT_HABLA, {
      transports: ["websocket", "polling"],
    });
 const socketExpresiones = socketIOClient(ENDPOINT_EXPRESIONES, {
        transports: ["websocket", "polling"],
      });
      
const socketPostura = socketIOClient(ENDPOINT_POSTURA, {
        transports: ["websocket", "polling"],
      });
      
    

const Socket = () => {
const dispatch = useDispatch()
useEffect(() => {
    socketHabla.on("SendMetrics", (msg) => {
      dispatch(obtenerMetricasAccion(msg.data.devices))
    });
/*   socketExpresiones.on("SendMetrics", (msg) => {
        dispatch(obtenerMetricasExpresionesAccion(msg.data.devices))
      });
    socketPostura.on("SendMetrics", (msg) => {
        dispatch(obtenerMetricasPosturasAccion(msg.data.devices))
      });   */
  }, []);

}

export default Socket;