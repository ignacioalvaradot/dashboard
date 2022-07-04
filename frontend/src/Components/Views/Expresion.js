import React, { useState, useEffect } from "react";
import NetworkExpGraph from "../Graphs/NetworkExpGraph";
import SpiderGraph from "../Graphs/SpiderGraph";
import ExpresionLineGraph from "../Graphs/ExpresionLineGraph";
import ExpresionPieChart from "../Graphs/ExpresionPieChart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import CircleIcon from "@mui/icons-material/Circle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ModalLegend from "../Graphs/ModalLegend";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import "../fonts.css";

const TinyText = styled(Typography)({
  fontSize: "0.8rem",

  fontWeight: 500,
  letterSpacing: 0.2,
  color: "#ffff",
});

const theme = createTheme({
  palette: {
    directo: {
      main: "#aa2e25",
    },
    retrocede: {
      main: "#757575",
    },
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
}));

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  //bgcolor: "background.paper",
  backgroundColor: "#f5f5f5",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  width: "100%",
  fontSize: "18px",
  paddingBlock: "2%",
  justifyContent: "flex-start",
  color: "black",
  fontWeight: "normal",
  margin: "0px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  lineHeight: "21px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const style3 = {
  color: "black",
  fontWeight: "normal",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontSize: "24px",
  letterSpacing: "0.1em",
  textTransform: "none",
};

const Habla = () => {
  const metricasExpresiones = useSelector(
    (store) => store.metricaHabla.array_expresiones
  );
  const [slidedata, setSlidedata] = useState([]);
  const [value, setValue] = useState(0);
  const [estado, setEstado] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [colorButton, setColorButton] = useState("directo");
  const handleClose = () => setSelectedItem(null);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }

  const slideChange = (event, newValue) => {
    setValue(newValue);
    setSlidedata(metricasExpresiones[value]);
    setEstado(true);
    setColorButton("retrocede");
  };

  const tick = () => {
    //datas.push(data)
    //setFinaldata(data);
    if (estado === false) {
      //setValue(datas.length);
      setValue(metricasExpresiones.length);
      setSlidedata(metricasExpresiones[value]);
    }
    //console.log(datas)
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    //setValue(value + 1);
    //setSlidedata(datas[value])
    tick();

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [metricasExpresiones]);

  return (
    <div>
      <Grid container justifyContent="center" m={1}>
        <Box
          sx={{
            backgroundColor: "#2499ef",
            borderRadius: "16px",
          }}
        >
          <Grid container justifyContent="center" m={1} mb={1}>
            <Box width={700}>
              <Slider
                aria-label="Volume"
                value={value}
                onChange={slideChange}
                max={metricasExpresiones.length}
                sx={{
                  color: "#ffff",
                  marginTop: "5px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: -2,
                  pt: 1,
                }}
              >
                <TinyText>{formatDuration(value)}</TinyText>
                <TinyText>
                  {formatDuration(metricasExpresiones.length)}
                </TinyText>
              </Box>
            </Box>
            <Box ml={3}>
              <ThemeProvider theme={theme}>
                <ColorButton
                  // eslint-disable-next-line
                  onClick={() => (setEstado(false), setColorButton("directo"))}
                  variant="contained"
                  startIcon={<CircleIcon />}
                  color={colorButton}
                  backgroundcolor={"#ffff"}
                >
                  {" "}
                  En directo
                </ColorButton>
              </ThemeProvider>
            </Box>

            <IconButton
              sx={{
                color: "#ffff",
              }}
            >
              <PlayArrowIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "#ffff",
              }}
              onClick={() => (
                // eslint-disable-next-line
                setEstado(true), setSlidedata(metricasExpresiones[value - 1])
              )}
            >
              <PauseIcon />
            </IconButton>
          </Grid>
        </Box>
        <Grid container justifyContent="flex-start" m={1} mt={4} mb={5}>
          <Box sx={style3} mr={2}>
            {" "}
            Gráficos de las expresiones
          </Box>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Este es un gráfico de red que busca la relacion entre los
                  miembros del grupo, las expresiones y sus respectivos colores
                  estan representadas en los nodos de cada sujeto y los arcos
                  entre nodos representa la simetria entre los sujetos,
                  siguiendo los mismos colores de cada expresión.
                </Typography>
              </React.Fragment>
            }
          >
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
          </HtmlTooltip>
        </Grid>
        {slidedata &&
          slidedata.map((canales, i) => (
            <div key={i}>
              <Grid item xs={2.3} mr={6} key={i}>
                <div style={{ textAlign: "center" }}>
                  <Button
                    sx={{
                      width: "270px",
                      height: "270px",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setSelectedItem(i);
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Grupo {i + 1}
                      </Typography>
                      <NetworkExpGraph
                        data={canales}
                        grupos={i}
                      ></NetworkExpGraph>
                    </Paper>
                  </Button>
                </div>
                <Modal
                  open={selectedItem === i}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton onClick={handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <div style={style2}>
                      {" "}
                      Gráfico detallado de las expresiones{" "}
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                      <ModalLegend data={i}></ModalLegend>
                    </div>
                    <Grid container spacing={6}>
                      <Grid item xs={4.1} py={2}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                          }}
                        >
                          <Grid container justifyContent="end">
                            <Grid justifyContent="center" sx={{ mr: 0 }}>
                              {" "}
                              <Typography color="inherit" align="justify">
                                Gráfico de radar de expresión
                              </Typography>
                            </Grid>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un grafico de radar que expresa la
                                    relacion de los sujetos (con su respectivo
                                    color) con cada una de las expresiones
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <SpiderGraph data={canales}></SpiderGraph>
                        </Paper>
                      </Grid>
                      <Grid item xs={4.2} py={2}>
                        <Paper
                          sx={{
                            p: 2,
                            pl: 4,
                            pb: 4,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                          }}
                        >
                          <Grid container justifyContent="end">
                            <Grid justifyContent="center" sx={{ mr: 0 }}>
                              {" "}
                              <Typography color="inherit" align="justify">
                                Gráfico de puntos en el tiempo
                              </Typography>
                            </Grid>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de puntos que muestra las
                                    expresiones del grupo a traves del tiempo,
                                    se refresca cada 30 segundos.
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <ExpresionLineGraph
                            data={canales}
                          ></ExpresionLineGraph>
                        </Paper>
                      </Grid>
                      <Grid item xs={3.7} py={2}>
                        <Paper
                          sx={{
                            p: 2,
                            pl: 4,
                            pb: 4,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                          }}
                        >
                          <Grid container justifyContent="end">
                            <Grid justifyContent="center" sx={{ mr: 0 }}>
                              {" "}
                              <Typography color="inherit" align="justify">
                                Gráfico de expresiones grupal
                              </Typography>
                            </Grid>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de torta que muestra la
                                    cantidad de expresión en porcentaje de todo
                                    el grupo.
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <ExpresionPieChart
                            data={canales}
                            width={270}
                            height={270}
                            innerRadius={0}
                            outerRadius={100}
                          ></ExpresionPieChart>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>
            </div>
          ))}
      </Grid>
    </div>
  );
};

export default Habla;