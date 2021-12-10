import React from "react";
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button';

const style = {
  styleBox: {
    width: "100%",
    fontSize: "13px",
    border: "2px solid red",
    color: "inherit",
    backgroundColor: "white",
    paddingBlock: "5%",
    justifyContent: "flex-start",
    fontFamily: "Verdana",
  },
  styleH2: {
    textAlign: "center",
    backgroundColor: "#694DFE",
    color: "black",
    fontWeight: "100",
    paddingBlock: "5%",
    margin: "1px",
    width: "100%",
    fontFamily: 'Verdana',
  },
};

const Boxes = () => {
  return (
    <div>
      <Grid container justifyContent="center" m={1}>
        <Grid item xs={2.3} px={5} py={2}>
          <h2 style={style.styleH2}>Multimétrica</h2>
        
          <Button sx = {style.styleBox} component={RouterLink} to="/">
          Experimento: <br/>
          Fase:
            </Button>
          
        </Grid>

        <Grid item xs={2.3} px={5} py={2}>
          <h2 style={style.styleH2}>Habla</h2>
          <Button sx = {style.styleBox} component={RouterLink} to="/Habla">
          Grupo: <br/>
          Grupo:       </Button>
        </Grid>

        <Grid item xs={2.3} px={5} py={2}>
          <h2 style={style.styleH2}>Posturas</h2>
          <Button sx = {style.styleBox} component={RouterLink} to="/Posturas">
          Mas abiertas: <br/>
          Mas cerradas:<br/>
          </Button>
        </Grid>

        <Grid item xs={2.3} px={5} py={2}>
          <h2 style={style.styleH2}>Expresiones</h2>
          <Button sx = {style.styleBox} component={RouterLink} to="/Expresiones">
          Mas simetria: <br/>
          Menos simetria:<br/>
          </Button>
        </Grid>

        <Grid item xs={2.3} px={5} py={2}>
          <h2 style={style.styleH2}>Gestos</h2>
          <Button sx = {style.styleBox} component={RouterLink} to="/Gestos">
          Gesto<br/> predominante
          
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Boxes;
