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
import { useDispatch, useSelector } from "react-redux";
import { obtenerMetricasAccion } from "../../redux/metricasDucks";
import ModalLegend from "../Graphs/ModalLegend";
import DoublePieChart from "../Graphs/DoublePieChart";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import "../fonts.css";

const theme = createTheme({
  palette: {
    directo: {
      // Purple and green play nicely together.
      main: "#aa2e25",
    },
    retrocede: {
      // This is green.A700 as hex.
      main: "#757575",
    },
  },
});

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
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  width: "100%",
  fontSize: "18px",
  backgroundColor: "white",
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

const Habla = () => {
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const [slidedata, setSlidedata] = useState([]);
  const [value, setValue] = useState(0);
  const [estado, setEstado] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [colorButton, setColorButton] = useState("directo");
  const handleClose = () => setSelectedItem(null);

  const slideChange = (event, newValue) => {
    setValue(newValue);
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
      setSlidedata(metricasHabla[value]);
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
                }}
              />
            </Box>
            <Box ml={3}>
              <ThemeProvider theme={theme}>
                <Button
                  onClick={() => (setEstado(false), setColorButton("directo"))}
                  variant="outlined"
                  startIcon={<CircleIcon />}
                  color={colorButton}
                >
                  {" "}
                  En directo
                </Button>
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
              onClick={() => (setEstado(true), setSlidedata(datas[value]))}
            >
              <PauseIcon />
            </IconButton>
          </Grid>
        </Box>
        <Grid container justifyContent="flex-start" m={1} mb={9}>
          <Box sx={style3} mr={2}>
            {" "}
            Gráficos de actividad vocal
          </Box>
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
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Grupo {i + 1}
                      </Typography>
                      <NetworkSpeechGraph data={canales} grupos={i}>
                        {" "}
                      </NetworkSpeechGraph>
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
                    <div style={{ textAlign: "center" }}>
                      <ModalLegend data={i}></ModalLegend>
                    </div>
                    <Grid container spacing={7}>
                      <Grid item xs={5} px={5} py={2}>
                        <DoublePieChart
                          data={canales}
                          width={270}
                          height={270}
                          innerRadius={55}
                          outerRadius={100}
                          grupos={i}
                        ></DoublePieChart>
                      </Grid>

                      {/* <Grid item xs={4}  px={6} py={2}>
              <MultilineGraph data={canales}></MultilineGraph></Grid>  */}
                      <Grid item xs={5} px={5} py={2}>
                        <StackedBarChart
                          data={canales}
                          grupos={i}
                        ></StackedBarChart>
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
