import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { HablaCard } from "./BoxesComponents/HablaCard";
import { MultimetricaCard } from "./BoxesComponents/MultimetricaCard";
import { PosturaCard } from "./BoxesComponents/PosturaCard";
import { ExpresionesCard } from "./BoxesComponents/ExpresionesCard";
import "./fonts.css";

const Boxes = () => {
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const metricasPostura = useSelector(
    (store) => store.metricaHabla.array_posturas
  );
  const metricasExpresiones = useSelector(
    (store) => store.metricaHabla.array_expresiones
  );
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataPosturaOpen, setDataPosturaOpen] = useState([]);
  const [dataPosturaClosed, setDataPosturaClosed] = useState([]);
  const [dataExpresiones, setDataExpresiones] = useState([]);
  const [tickes, setTickes] = useState([0]);

  let bubbleSort = (inputArr) => {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (inputArr[j] > inputArr[j + 1]) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
        }
      }
    }
    return inputArr;
  };

  const ticks = () => {
    setTickes((currentData) => [...currentData, tickes.slice(-1)[0] + 1]);
  };

  const tick = () => {
    setValue(metricasHabla.length);

    //console.log(value);
    var promEfectv = 0;
    var promEfectvOpen = 0;
    var promEfectvClosed = 0;
    var promEfectvExp = 0;
    var stacks = [];
    var stacksOpen = [];
    var stacksClosed = [];
    var stacksExp = [];

    if (
      Array.isArray(metricasPostura[metricasPostura.length - 1]) &&
      metricasPostura[metricasPostura.length - 1].length
    ) {
      //console.log("entro");
      metricasPostura[metricasPostura.length - 1].map(
        (data, i) =>
          (promEfectvOpen =
            promEfectvOpen + data.group.acumulate_posture[0].value)
      );

      metricasPostura[metricasPostura.length - 1].map(
        (data, i) =>
          (promEfectvClosed =
            promEfectvClosed + data.group.acumulate_posture[1].value)
      );

      metricasPostura[metricasPostura.length - 1].map(
        (data, i) =>
          (stacksOpen[i] = [
            (data.group.acumulate_posture[0].value / promEfectvOpen) * 100 -
              100 / metricasPostura[metricasPostura.length - 1].length,
            i,
          ])
      );

      metricasPostura[metricasPostura.length - 1].map(
        (data, i) =>
          (stacksClosed[i] = [
            (data.group.acumulate_posture[1].value / promEfectvClosed) * 100 -
              100 / metricasPostura[metricasPostura.length - 1].length,
            i,
          ])
      );
    }

    if (Array.isArray(metricasHabla[value]) && metricasHabla[value].length) {
      metricasHabla[value].map(
        (data, i) => (promEfectv = promEfectv + data.group.total_time_act)
      );

      metricasHabla[value].map(
        (data, i) =>
          /* (stacks[i] = [
            (data.group.total_time_act / promEfectv) * 100 -
              100 / metricasHabla[value].length,
            i,
          ]) */
          (stacks[i] = [
            (100 * data.group.total_time_act) /
              (promEfectv / metricasHabla[value].length) -
              100,
            i,
          ])
      );
    }

    if (
      Array.isArray(metricasExpresiones[metricasExpresiones.length - 1]) &&
      metricasExpresiones[metricasExpresiones.length - 1].length
    ) {
      metricasExpresiones[metricasExpresiones.length - 1].map(
        (data, i) => (promEfectvExp = promEfectvExp + data.group.total_symmetry)
      );

      metricasExpresiones[metricasExpresiones.length - 1].map(
        (data, i) =>
          /* (stacks[i] = [
            (data.group.total_time_act / promEfectv) * 100 -
              100 / metricasHabla[value].length,
            i,
          ]) */
          (stacksExp[i] = [
            (100 * data.group.total_symmetry) /
              (promEfectvExp /
                metricasExpresiones[metricasExpresiones.length - 1].length) -
              100,
            i,
          ])
      );
    }
    //console.log(promEfectvOpen);
    //console.log(promEfectvClosed);
    //console.log(metricasPostura[metricasPostura.length - 1]);
    //console.log(stacks);
    setData(bubbleSort(stacks));
    setDataPosturaOpen(bubbleSort(stacksOpen));
    setDataPosturaClosed(bubbleSort(stacksClosed));
    setDataExpresiones(bubbleSort(stacksExp));
    //console.log(dataExpresiones);
    //console.log(dataPosturaOpen);
    //console.log(dataPosturaClosed);
    //console.log(data);
  };

  useEffect(() => {
    const interval = setInterval(ticks, 1000);
    tick();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [tickes]);

  const datosExp = useSelector((store) => store.DatosExp.array);
  return (
    <div>
      {datosExp.experimento && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <MultimetricaCard data={datosExp} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <HablaCard data={data} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <PosturaCard
                  dataopen={dataPosturaOpen}
                  dataclosed={dataPosturaClosed}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ExpresionesCard data={dataExpresiones} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default Boxes;
