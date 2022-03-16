import React from "react";
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

export const PosturaCard = (props) => (
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
                  Este es un gráfico de red que busca la relacion entre los
                  miembros del grupo
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
          Grupo 1
        </Typography>
        <ArrowUpwardIcon color="success" />
        <Typography
          color="success"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Mas que el promedio
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
          Grupo 3
        </Typography>
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Menos que el promedio
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
          Ir al detalle de postura
        </Button>
      </Grid>
    </CardContent>
  </Card>
);
