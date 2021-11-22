import React, {useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Boxes = props => {

    return (
<div>
    <Grid container spacing={5} justifyContent="center" mt = {2} >
        <Grid item xs={2}  >
            <Box border = {2} >
                <Box >
                    Experimento: 
                </Box>
                <Box  >
                    Fase:
                </Box>

                <Box  >
                    Tiempo:
                </Box>
            </Box>
        
            </Grid>
            <Grid item xs={2} >
            <Box border = {2}  >
                <Box >
                    Grupo 1: 
                </Box>
                <Box  >
                    Grupo 2:
                </Box>
            </Box>
        
            </Grid>
            <Grid item xs={2}>
            <Box border = {2} >
                test
            </Box>
        
            </Grid>
            <Grid item xs={2} >
            <Box border = {2} >
                test
            </Box>
        
            </Grid>

            <Grid item xs={2} >
            <Box border = {2}  >
                test
            </Box>
        
            </Grid>

        </Grid>


</div>


    );

};

export default Boxes; 