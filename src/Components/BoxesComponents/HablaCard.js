import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import hablaicono from "../../Utilities/habla-icono.jpg";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="right" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const HablaCard = ({ data }) => {
  const [grupoMenor, setGrupoMenor] = useState(0);
  const [grupoMayor, setGrupoMayor] = useState(0);
  const [PorcMenor, setPorcMenor] = useState(0);
  const [PorcMayor, setPorcMayor] = useState(0);

  useEffect(() => {
    if (data.length) {
      setGrupoMayor(data[data.length - 1][1] + 1);
      setGrupoMenor(data[0][1] + 1);
      setPorcMayor(data[data.length - 1][0]);
      setPorcMenor(data[0][0]);
    }
  }, [data]);

  return (
    <Card sx={{ height: "100%", borderRadius: "8px" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Avatar
              src={hablaicono}
              sx={{
                backgroundColor: "#dba5fa",
                height: 30,
                width: 30,
                borderRadius: "8px",
              }}
            ></Avatar>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <Typography color="textSecondary" gutterBottom variant="overline">
              Habla
            </Typography>
          </Grid>
          <Grid item>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Esta tarjeta muestra los grupos con mas y menos habla del
                    promedio correspondientemente
                  </Typography>
                </React.Fragment>
              }
            >
              <IconButton color="primary">
                <InfoIcon />
              </IconButton>
            </HtmlTooltip>
          </Grid>
        </Grid>
        {/*  <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Grid item>
            <Avatar
              src={hablaicono}
              sx={{
                backgroundColor: "error.main",
                height: 30,
                width: 30,
                borderRadius: "8px",
              }}
            >
            </Avatar>
          </Grid>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Habla
          </Typography>
        </Grid>
      </Grid> */}

        {/* {data.length && ( */}
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color="success"
            sx={{
              mr: 8,
            }}
            variant="body2"
          >
            {/* {"Grupo " + (data[data.length - 1][1] + 1)} */}
            {"Grupo " + grupoMayor}
          </Typography>
          <ArrowUpwardIcon color="success" />
          <Typography
            color="success"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {/* {Math.round(data[data.length - 1][0]) + "%"} */}
            {Math.round(PorcMayor) + "%"}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Mas que el promedio
          </Typography>
        </Box>
        {/* )} */}
        {/* {data.length && ( */}
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color="error"
            sx={{
              mr: 8,
            }}
            variant="body2"
          >
            {/* {"Grupo " + (data[0][1] + 1)} */}
            {"Grupo " + grupoMenor}
          </Typography>
          <ArrowDownwardIcon color="error" />
          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {/* {Math.abs(Math.round(data[0][0])) + "%"} */}
            {Math.abs(Math.round(PorcMenor)) + "%"}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Menos que el promedio
          </Typography>
        </Box>
        {/* )} */}
        <Grid
          item
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button component={RouterLink} to="/habla" variant="outlined">
            Ver más
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};
