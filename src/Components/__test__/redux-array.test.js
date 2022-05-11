import { render, screen, cleanup } from "@testing-library/react";
import {
  obtenerMetricasAccion,
  obtenerMetricasExpresionesAccion,
  obtenerMetricasPosturasAccion,
} from "../../redux/metricasDucks";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateStore from "../../redux/store.js";
import { useDispatch, useSelector } from "react-redux";
//FIXME - EL TEST NO FUNCIONA, BORRAR SI ES NECESARIO
const dispatch = useDispatch();
test("renders without crashing", () => {
  const datosEjemplo = {
    name: "Mic02",
    direction: 0,

    trace_delta: [
      {
        source: 3,
        target: 3,
        weigth: 4,
      },
      {
        source: 1,
        target: 4,
        weigth: 8,
      },
    ],
    group: {
      totalTimeInterv: 628,
      totalTimeEfectv: 196,
      totalTimeSilenc: 226,
      total_time_act: 233,
    },
    channel: [
      {
        channelId: 1,
        valor: 1,
        numeroInterv: 3,
        acumulateInterv: [26, 15, 14, 5, 10, 15],
        totalTimeInterv: 195,
        totalTimeEfectv: 0,
        totalTimeSilenc: 67,
        totalPart: 4,
      },
      {
        channelId: 2,
        valor: 0,
        numeroInterv: 19,
        acumulateInterv: [14, 6, 13, 13, 17, 22],
        totalTimeInterv: 154,
        totalTimeEfectv: 5,
        totalTimeSilenc: 91,
        totalPart: 75,
      },
      {
        channelId: 3,
        valor: 0,
        numeroInterv: 10,
        acumulateInterv: [10, 2, 14, 19, 15, 9],
        totalTimeInterv: 187,
        totalTimeEfectv: 96,
        totalTimeSilenc: 90,
        totalPart: 8,
      },
      {
        channelId: 4,
        valor: 1,
        numeroInterv: 18,
        acumulateInterv: [28, 13, 6, 19, 2, 12],
        totalTimeInterv: 154,
        totalTimeEfectv: 77,
        totalTimeSilenc: 7,
        totalPart: 62,
      },
    ],
  };

  const store = generateStore();

  dispatch(obtenerMetricasAccion(datosEjemplo));
  dispatch(obtenerMetricasExpresionesAccion(datosEjemplo));
  dispatch(obtenerMetricasPosturasAccion(datosEjemplo));
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const metricasPostura = useSelector(
    (store) => store.metricaHabla.array_posturas
  );
  const metricasExpresiones = useSelector(
    (store) => store.metricaHabla.array_expresiones
  );
  expect(datosEjemplo).toBe(metricasHabla);
});
