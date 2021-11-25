import React, {useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";


const Boxes = () => {

    return (
<div>
    <Grid container spacing={5} justifyContent="center" mt = {2} >
        <Grid item xs={2}  >
            <Box  border = {2} component={RouterLink} 
          to="/">
               Multimetrica
            </Box>
        
            </Grid>
            <Grid item xs={2} >
            <Box border = {2} component={RouterLink} 
          to="/Habla" >
                Habla
            </Box>
        
            </Grid>
            <Grid item xs={2}>
            <Box border = {2} component={RouterLink} 
          to="/Posturas">
                Postura
            </Box>
        
            </Grid>
            <Grid item xs={2} >
            <Box border = {2}  component={RouterLink} 
          to="/Expresiones">
                Expresiones
            </Box>
        
            </Grid>

            <Grid item xs={2} >
            <Box border = {2}  component={RouterLink} 
          to="/Gestos">
                Gestos
            </Box>
        
            </Grid>

        </Grid>


</div>


    );

};

export default Boxes; 