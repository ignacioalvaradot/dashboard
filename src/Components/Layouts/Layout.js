import Boxes from "../Boxes.js";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DashboardNavbar } from "./dashboard-navbar.js";
import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: "10px",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar disableGutters className={classes.toolbar}>
            <Button color="primary">Grupos</Button>
            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Notifications">
              <IconButton sx={{ ml: 1 }}>
                <InfoIcon></InfoIcon>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box> */}
      <DashboardNavbar />
      <Boxes />
      <div className="container p-4">{children}</div>
    </>
  );
}
