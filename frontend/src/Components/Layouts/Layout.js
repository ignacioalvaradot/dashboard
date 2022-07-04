import Boxes from "../Boxes.js";
import * as React from "react";
import { DashboardNavbar } from "./dashboard-navbar.js";

export default function Layout({ children }) {
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
