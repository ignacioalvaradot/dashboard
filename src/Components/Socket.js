import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  obtenerMetricasAccion,
  obtenerMetricasExpresionesAccion,
  obtenerMetricasPosturasAccion,
} from "../redux/metricasDucks";
import { useEffect } from "react";

//ENDPOINTS
//const ENDPOINT_HABLA = "http://dnsdiegomiranda2.ddns.net/Report";
//const ENDPOINT_HABLA = "http://192.168.43.30:200/tiempohabla";
const ENDPOINT_HABLA = "http://192.168.1.14:82/Report";
/* const ENDPOINT_EXPRESIONES= "http://dnsdiegomiranda.ddns.net/Report";
const ENDPOINT_POSTURA = "http://dnsdiegomiranda.ddns.net/Report"; */

const socketHabla = socketIOClient(ENDPOINT_HABLA, {
  transports: ["websocket", "polling"],
});
/*  const socketExpresiones = socketIOClient(ENDPOINT_EXPRESIONES, {
        transports: ["websocket", "polling"],
      });
      
const socketPostura = socketIOClient(ENDPOINT_POSTURA, {
        transports: ["websocket", "polling"],
      });
       */

const Socket = () => {
  var temporal;
  const dispatch = useDispatch();
  useEffect(() => {
    socketHabla.on("report_metric", (msg) => {
      temporal = msg.data.devices;
    });

    /* socketHabla.on("SendMetrics", (msg) => {
      temporal = msg.data.devices;
    });   */
    /*   socketExpresiones.on("SendMetrics", (msg) => {
        dispatch(obtenerMetricasExpresionesAccion(msg.data.devices))
      });
    socketPostura.on("SendMetrics", (msg) => {
        dispatch(obtenerMetricasPosturasAccion(msg.data.devices))
      });   */
  }, []);

  const tick = () => {
    dispatch(obtenerMetricasAccion(temporal));
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
};

export default Socket;
