import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import multimetricaicono from "../../Utilities/multimetrica-icon.png";
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

export const MultimetricaCard = ({ data }) => (
  <Card sx={{ height: "100%", borderRadius: "8px" }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Avatar
            src={multimetricaicono}
            sx={{
              backgroundColor: "#659df7",
              height: 30,
              width: 30,
              borderRadius: "8px",
            }}
          ></Avatar>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Multimetrica
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
                  Esta tarjeta entrega informacion acerca de los detalles del
                  experimento
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
          color="textSecondary"
          sx={{
            mr: 6,
          }}
          variant="body2"
        >
          Experimento:
        </Typography>
        <Typography color="t" variant="body2" sx={{ fontWeight: "bold" }}>
          {data.experimento.nombreExp}
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
          color="textSecondary"
          sx={{
            mr: 7,
          }}
          variant="body2"
        >
          Fase actual:
        </Typography>
        <Typography
          color="textPrimary"
          variant="body2"
          sx={{ fontWeight: "bold" }}
        >
          {parseInt(data.experimento.faseActiva) + 1}
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
        <Button component={RouterLink} to="/" variant="outlined">
          Ir al detalle de multimetrica
        </Button>
      </Grid>
    </CardContent>
  </Card>
);
