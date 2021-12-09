import Boxes from "../Boxes.js";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: '10px',
    justifyContent: "center",
    backgroundColor: "#694DFE",
    
  }
}));


export default function Layout({ children }) {
  const classes = useStyles();
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar className={classes.toolbar}>
          <Button color="inherit" >Grupos</Button>
        </Toolbar>
      </AppBar>
    </Box>
            <Boxes />
            <div className="container p-4">
                {children}
            </div>
        </>
    )
}
