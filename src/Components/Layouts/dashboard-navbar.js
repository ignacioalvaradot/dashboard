import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Button,
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@material-ui/core/styles";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  position: "static",
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
}));

export const DashboardNavbar = (props) => {
  const classes = useStyles();
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: {
            lg: "calc(100%)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            md: 10,
          }}
          className={classes.toolbar}
        >
          <Tooltip title="Busqueda">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Grupos">
            <IconButton sx={{ ml: 1 }}>
              <GroupIcon></GroupIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Información">
            <IconButton sx={{ ml: 1 }}>
              <InfoIcon></InfoIcon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
