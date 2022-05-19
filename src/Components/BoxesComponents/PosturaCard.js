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
import posturaicono from "../../Utilities/postura-icono.png";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
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

export const PosturaCard = (props) => {
  const [grupoMenor, setGrupoMenor] = useState(0);
  const [grupoMayor, setGrupoMayor] = useState(0);
  const [PorcMenor, setPorcMenor] = useState(0);
  const [PorcMayor, setPorcMayor] = useState(0);

  useEffect(() => {
    if (props.dataOpen.length && props.dataClosed.length) {
      setGrupoMayor(props.dataOpen[props.dataOpen.length - 1][1] + 1);
      setGrupoMenor(props.dataClosed[props.dataClosed.length - 1][1] + 1);
      setPorcMayor(props.dataOpen[props.dataOpen.length - 1][0]);
      setPorcMenor(props.dataClosed[props.dataClosed.length - 1][0]);
    }
  }, [props.dataOpen, props.dataClosed]);
  return (
    <Card sx={{ height: "100%", borderRadius: "8px" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Avatar
              src={posturaicono}
              sx={{
                backgroundColor: "#fc86b9",
                height: 30,
                width: 30,
                borderRadius: "8px",
              }}
            ></Avatar>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Postura
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Esta tarjeta muestra los grupos con mas posturas abiertas y
                    cerradas correspondientemente
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
            Más abiertas
          </Typography>

          <Typography
            color="success"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {"Grupo " + grupoMayor}
          </Typography>
        </Box>
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
            Más cerradas
          </Typography>

          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {"Grupo " + grupoMenor}
          </Typography>
        </Box>
        <Grid
          item
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button component={RouterLink} to="/posturas" variant="outlined">
            Ver más
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};
