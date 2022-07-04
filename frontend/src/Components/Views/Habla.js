import React, { useState, useEffect } from "react";
import NetworkSpeechGraph from "../Graphs/NetworkSpeechGraph";
import MultilineGraph from "../Graphs/MultilineGraph";
import StackedBarChart from "../Graphs/StackedBarChart";
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
import { useSelector } from "react-redux";
import ModalLegend from "../Graphs/ModalLegend";
import DoublePieChart from "../Graphs/DoublePieChart";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

import { red } from "@mui/material/colors";
import "../fonts.css";
import NetworkIntervGraph from "../Graphs/NetworkInterv";

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
  width: 1000,
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
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const [slidedata, setSlidedata] = useState([]);
  const [value, setValue] = useState(0);
  const [estado, setEstado] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [colorButton, setColorButton] = useState("directo");
  //const [tick, setTick] = useState([0]);
  const [open] = useState(false);
  const handleClose = () => setSelectedItem(null);
  //const dataUpdate = useSelector((store) => store.DatosUpdate.array);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }

  const slideChange = (event, newValue) => {
    setValue(newValue);
    setSlidedata(metricasHabla[value]);
    setEstado(true);
    setColorButton("retrocede");
    /*   console.log(value);
    console.log(slidedata); */
  };

  const tick = () => {
    //datas.push(data)
    //setFinaldata(data);
    if (estado === false) {
      //setValue(datas.length);
      setValue(metricasHabla.length);
      setSlidedata(metricasHabla[value]);
    }
    //console.log(datas)
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    tick();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [metricasHabla]);

  /* const ticks = () => {
    setTick((currentData) => [...currentData, tick.slice(-1)[0] + 1]);
  };

  useEffect(() => {
    const interval = setInterval(ticks, dataUpdate);
    if (estado === false) {
      //setValue(datas.length);
      setValue(metricasHabla.length);
      setSlidedata(metricasHabla[value]);
    }
    //console.log(tick)
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [tick]); */
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
                max={metricasHabla.length}
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
                <TinyText>{formatDuration(metricasHabla.length)}</TinyText>
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
                setEstado(true), setSlidedata(metricasHabla[value - 1])
              )}
            >
              <PauseIcon />
            </IconButton>
          </Grid>
        </Box>
        <Grid container justifyContent="flex-start" m={1} mt={4} mb={5}>
          <Box sx={style3} mr={2}>
            {" "}
            Gráficos de actividad vocal
          </Box>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Este es un gráfico de red que busca la relacion entre los
                  miembros del grupo, el tamaño de los nodos representan el
                  número de intervenciones del sujeto correspondiente , el
                  tamaño de las aristas representan la simetria entre sujetos y
                  la dirección representa desde y hacia quién existe la
                  simetria.
                </Typography>
              </React.Fragment>
            }
          >
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
          </HtmlTooltip>
          {/* 
          Este boton intercambia los graficos de red del habla
          <IconButton onClick={() => setOpen(!open)} color="primary">
            <SwapHorizIcon />
          </IconButton> */}
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

                      {/*  <NetworkSpeechGraph data={canales} grupos={i}>
                        {" "}
                      </NetworkSpeechGraph> */}
                      {!open ? (
                        <NetworkSpeechGraph data={canales} grupos={i}>
                          {" "}
                        </NetworkSpeechGraph>
                      ) : (
                        <NetworkIntervGraph data={canales} grupos={i}>
                          {" "}
                        </NetworkIntervGraph>
                      )}
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
                    <div style={style2}> Gráfico detallado habla </div>
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                      <ModalLegend data={i}></ModalLegend>
                    </div>
                    <Grid container spacing={6}>
                      <Grid item xs={4} py={2}>
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
                                Gráfico de torta anidado
                              </Typography>
                            </Grid>

                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de torta anidado que
                                    expresa el porcentaje de cada sujeto (con su
                                    respectivo color) del numero total de
                                    intervenciones y el tiempo de estas
                                    intervenciones
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <DoublePieChart
                            data={canales}
                            width={270}
                            height={270}
                            innerRadius={60}
                            outerRadius={100}
                            grupos={i}
                          ></DoublePieChart>
                        </Paper>
                      </Grid>

                      <Grid item xs={4} py={2}>
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
                                Gráfico intervenciones
                              </Typography>
                            </Grid>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de lineas que expresa las
                                    intervenciones de cada sujeto (con su
                                    respectivo color) a traves de el tiempo
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <MultilineGraph
                            data={canales}
                            tiempo={metricasHabla.length}
                          ></MultilineGraph>
                        </Paper>
                      </Grid>
                      <Grid item xs={4} py={2}>
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
                                Gráfico de tiempo del habla
                              </Typography>
                            </Grid>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de barra donde se expresa
                                    el porcentaje de tiempo total de habla
                                    (color de cada sujeto) y el tiempo en
                                    silencio (barra sin relleno) en relación al
                                    100%
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <StackedBarChart
                            data={canales}
                            grupos={i}
                          ></StackedBarChart>
                        </Paper>
                      </Grid>
                      {/* <Grid item xs={4}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                          }}
                        >
                          <Grid sx={{ textAlign: "end" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de red que busca la
                                    relacion entre los miembros del grupo
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <NetworkIntervGraph
                            data={canales}
                            grupos={i}
                          ></NetworkIntervGraph>
                        </Paper>
                      </Grid> */}
                      {/*  <Grid item xs={4}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "8px",
                          }}
                        >
                          <Grid sx={{ textAlign: "end" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de red que busca la
                                    relacion entre los miembros del grupo
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <NetworkSpeechExample
                            data={datosEjemplo}
                            grupos={i}
                          ></NetworkSpeechExample>
                        </Paper>
                      </Grid> */}
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
