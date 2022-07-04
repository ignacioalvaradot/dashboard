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
const ENDPOINT_HABLA = "http://192.168.1.16:200/tiempohabla";
//const ENDPOINT_HABLA = "http://192.168.1.5:82/Report";
const ENDPOINT_EXPRESIONES = "http://192.168.1.16:200/expresiones";
const ENDPOINT_POSTURA = "http://192.168.1.16:200/postura";

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
  var temporal;
  var temporal2;
  var temporal3;

  const dispatch = useDispatch();

  useEffect(() => {
    /* socketHabla.on("report_metric", (msg) => {
      temporal = msg.data.devices;
    }); */

    socketHabla.on("SendMetrics", (msg) => {
      // eslint-disable-next-line
      temporal = msg.data.devices;
    });
    socketExpresiones.on("SendMetrics", (msg) => {
      // eslint-disable-next-line
      temporal2 = msg.data.devices;
    });
    socketPostura.on("SendMetrics", (msg) => {
      // eslint-disable-next-line
      temporal3 = msg.data.devices;
    });
  }, []);

  const tick = () => {
    /* var multi = [];
    temporal4 = [[...temporal], [...temporal2], [...temporal3]];
    temporal4.map((canales, i) => (multi = [...multi, canales.channel]));
    //temporal4.map((canales, i) => (multi = multi.concat(canales.channel))); */
    dispatch(obtenerMetricasAccion(temporal));
    dispatch(obtenerMetricasExpresionesAccion(temporal2));
    dispatch(obtenerMetricasPosturasAccion(temporal3));
    // console.log(temporal4);
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);
};

export default Socket;
