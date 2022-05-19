import React, { useState, useEffect } from "react";
import NetworkSpeechGraph from "../Graphs/NetworkSpeechGraph";
import NetworkGraph from "../Graphs/NetworkGraph";
import NetworkExpGraph from "../Graphs/NetworkExpGraph";
import NetworkPostGraph from "../Graphs/NetworkPostGraph";
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
import { useDispatch, useSelector } from "react-redux";
import ModalLegend from "../Graphs/ModalLegend";
import DoublePieChart from "../Graphs/DoublePieChart";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import { obtenerDatosExperimentoAccion } from "../../redux/metricasDucks";
import Multi from "../Graphs/Multi";
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

var datas = [];

const Multimetrica = () => {
  const dispatch = useDispatch();
  const [dataMmexp, setDataMmexp] = useState("no hay datos");
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const metricasPostura = useSelector(
    (store) => store.metricaHabla.array_posturas
  );
  const metricasExpresiones = useSelector(
    (store) => store.metricaHabla.array_expresiones
  );
  const dataExp = useSelector((store) => store.DatosExp.array);
  const [grupos, setGrupos] = useState(0);
  const [slidedata, setSlidedata] = useState([]);
  const [value, setValue] = useState(0);
  const [valuePostura, setValuePostura] = useState(0);
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
    setValuePostura(newValue);
    setSlidedata(metricasHabla[value]);
    setEstado(true);
    setColorButton("retrocede");
    console.log(value);
    console.log(slidedata);
  };

  const tick = () => {
    //datas.push(data)
    //setFinaldata(data);
    if (estado == false) {
      //setValue(datas.length);
      setValue(metricasHabla.length);
      setValuePostura(metricasPostura.length);
      setSlidedata(metricasHabla[value]);
    }
    //console.log(datas)
  };

  useEffect(() => {
    if (dataExp.length != 0) {
      setGrupos(dataExp.fase[dataExp.experimento.faseActiva].idGrupos);
      console.log(grupos);
    }
  }, [dataExp]);

  useEffect(() => {
    window.addEventListener(
      "message",
      function (e) {
        if (e.origin == "http://localhost") {
          setDataMmexp(JSON.stringify(e.data));
          dispatch(obtenerDatosExperimentoAccion(e.data));
          console.log(dataMmexp);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage("open", "http://localhost");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    //setValue(value + 1);
    //setSlidedata(datas[value])
    tick();
    //console.log(grupos);

    return () => {
      clearInterval(interval);
    };
  }, [metricasHabla]);

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
                  onClick={() => (setEstado(false), setColorButton("directo"))}
                  variant="contained"
                  startIcon={<CircleIcon />}
                  color={colorButton}
                  backgroundColor={"#ffff"}
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
            Gráficos Multimétrica
          </Box>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Este es un gráfico de red que combina las métricas de habla,
                  postura y expresiones en una sola.
                </Typography>
              </React.Fragment>
            }
          >
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
          </HtmlTooltip>
        </Grid>
        {grupos &&
          /* metricasHabla.length != 0 &&
          metricasPostura.length != 0 &&
          metricasExpresiones.length != 0 && */
          /* metricasHabla[metricasHabla.length - 1] != null &&
          metricasPostura[metricasPostura.length - 1] != null &&
          metricasExpresiones[metricasExpresiones.length - 1] != null && */

          metricasHabla[value - 1] != null &&
          metricasPostura[valuePostura - 1] != null &&
          metricasExpresiones[value - 1] != null &&
          value - 1 > 0 &&
          valuePostura - 1 > 0 &&
          grupos.map((canales, i) => (
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
                      {value - 1 > 0 && valuePostura > 0 && (
                        <Multi
                          cantidad={canales.participantes}
                          habla={metricasHabla}
                          postura={metricasPostura}
                          expresiones={metricasExpresiones}
                          tiempo={value - 1}
                          tiempoPostura={valuePostura - 1}
                          grupos={i}
                        ></Multi>
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
                    <div style={style2}> Gráfico detallado multimétrica </div>
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
                          <Grid sx={{ textAlign: "end" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de red que busca la
                                    relacion entre los miembros del grupo, los
                                    nodos representan el número de
                                    intervenciones del sujeto correspondiente ,
                                    el tamaño de las aristas representan la
                                    simetria entre sujetos y la dirección
                                    representa desde y hacia quién existe la
                                    simetria.
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <NetworkSpeechGraph
                            /* data={metricasHabla[value - 1][i]} */
                            data={metricasHabla[metricasHabla.length - 1][i]}
                            grupos={i}
                          >
                            {" "}
                          </NetworkSpeechGraph>
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
                          <Grid sx={{ textAlign: "end" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de red que busca la
                                    relación entre los miembros del grupo, la
                                    torta en los nodos representa el porcentaje
                                    de postura abierta (amarillo) y postura
                                    cerrada (verde) en el sujeto
                                    correspondiente, el arco entre nodos
                                    representa la simetria entre los sujetos,
                                    siguiendo los mismos colores y la flecha de
                                    cada sujeto indica la dirección de su
                                    mirada.
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <NetworkPostGraph
                            data={
                              metricasPostura[metricasPostura.length - 1][i]
                            }
                            grupos={i}
                          >
                            {" "}
                          </NetworkPostGraph>
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
                          <Grid sx={{ textAlign: "end" }}>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography color="inherit">
                                    Este es un gráfico de red que busca la
                                    relacion entre los miembros del grupo, las
                                    expresiones y sus respectivos colores estan
                                    representadas en los nodos de cada sujeto y
                                    los arcos entre nodos representa la simetria
                                    entre los sujetos, siguiendo los mismos
                                    colores de cada expresión.
                                  </Typography>
                                </React.Fragment>
                              }
                            >
                              <IconButton color="primary">
                                <InfoIcon />
                              </IconButton>
                            </HtmlTooltip>
                          </Grid>
                          <NetworkExpGraph
                            /* data={metricasExpresiones[value - 1][i]} */
                            data={
                              metricasExpresiones[
                                metricasExpresiones.length - 1
                              ][i]
                            }
                            grupos={i}
                          ></NetworkExpGraph>
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

export default Multimetrica;
