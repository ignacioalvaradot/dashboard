import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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
  TextField,
  Input,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { obtenerDatosUpdateAccion } from "../../redux/metricasDucks";
const ariaLabel = { "aria-label": "description" };

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [update, SetUpdate] = useState(1000);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerDatosUpdateAccion(update));
  }, [update]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          {/* <Tooltip title="Tiempo de actualización">
            <IconButton
              sx={{ ml: 1 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccessTimeFilledIcon></AccessTimeFilledIcon>
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "8ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="filled-basic" label="Filled" variant="filled" />
              </Box>
            </MenuItem>
          </Menu> */}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "8ch", height: "5ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            /> */}
            <Input
              placeholder="Tiempo (S)"
              inputProps={ariaLabel}
              //value={SetUpdate()}
              onChange={(e) => {
                SetUpdate(e.target.value * 1000);
              }}
            />
          </Box>
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
