import React, { useState, useEffect } from "react";
import NetworkPostGraph from "../Graphs/NetworkPostGraph";
import MultilineGraph from "../Graphs/MultilineGraph";
import StackedBarChart from "../Graphs/StackedBarChart";
import NetworkGraph from "../Graphs/NetworkGraph";
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
import { obtenerMetricasAccion } from "../../redux/metricasDucks";
import ModalLegend from "../Graphs/ModalLegend";
import DoublePieChart from "../Graphs/DoublePieChart";
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

const Postura = () => {
  const metricasPostura = useSelector(
    (store) => store.metricaHabla.array_posturas
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
    setSlidedata(metricasPostura[value]);
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
      setValue(metricasPostura.length);
      setSlidedata(metricasPostura[value]);
    }
    //console.log(datas)
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);

    tick();

    return () => {
      clearInterval(interval);
    };
  }, [metricasPostura]);

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
                max={metricasPostura.length}
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
                <TinyText>{formatDuration(metricasPostura.length)}</TinyText>
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
                setEstado(true), setSlidedata(metricasPostura[value - 1])
              )}
            >
              <PauseIcon />
            </IconButton>
          </Grid>
        </Box>
        <Grid container justifyContent="flex-start" m={1} mt={4} mb={5}>
          <Box sx={style3} mr={2}>
            {" "}
            Gráficos de la postura
          </Box>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Este es un gráfico de red que grafica las posturas abiertas
                  ("color verde") y las posturas cerradas ("color naranjo") de
                  cada uno de los participantes.
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
                      <NetworkPostGraph data={canales} grupos={i}>
                        {" "}
                      </NetworkPostGraph>
                      {/* <NetworkGraph data={canales} grupos={i}>
                        {" "}
                      </NetworkGraph> */}
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
                    <div style={style2}> Gráfico detallado de la postura </div>
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                      <ModalLegend data={i}></ModalLegend>
                    </div>
                  </Box>
                </Modal>
              </Grid>
            </div>
          ))}
      </Grid>
    </div>
  );
};

export default Postura;
