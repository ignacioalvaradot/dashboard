import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { HablaCard } from "./BoxesComponents/HablaCard";
import { MultimetricaCard } from "./BoxesComponents/MultimetricaCard";
import { PosturaCard } from "./BoxesComponents/PosturaCard";
import { ExpresionesCard } from "./BoxesComponents/ExpresionesCard";
import "./fonts.css";

const Boxes = () => {
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
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
    var stacks = [];
    if (Array.isArray(metricasHabla[value]) && metricasHabla[value].length) {
      metricasHabla[value].map(
        (data, i) => (promEfectv = promEfectv + data.group.total_time_act)
      );

      metricasHabla[value].map(
        (data, i) =>
          (stacks[i] = [
            (data.group.total_time_act / promEfectv) * 100 -
              100 / metricasHabla[value].length,
            i,
          ])
      );
    }
    //console.log(stacks);
    setData(bubbleSort(stacks));
    //console.log(data);
  };

  useEffect(() => {
    const interval = setInterval(ticks, 1000);
    tick();
    return () => {
      clearInterval(interval);
    };
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
                <PosturaCard />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ExpresionesCard />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </div>
  );
};

export default Boxes;
