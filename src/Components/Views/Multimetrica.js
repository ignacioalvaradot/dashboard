import React, { useState, useEffect } from "react";
import NetworkGraph2 from "./../Graphs/NetworkGraph2";
import NetworkMultiGraph from "./../Graphs/NetworkMultiGraph";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://192.168.1.13:200/multimetrica";

const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling"],
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  width: "100%",
  fontSize: "18px",
  backgroundColor: "white",
  paddingBlock: "5%",
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

const Multimetrica = () => {
  const [dataHabla, updateDataHabla] = useState([]);
  const [finaldata, setFinaldata] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleClose = () => setSelectedItem(null);

  const tick = () => {
    setFinaldata(dataHabla);
  };

  useEffect(() => {
    const interval = setInterval(tick, 4000);
    //console.log("data final",finaldata)
    return () => {
      clearInterval(interval);
    };
  }, [finaldata]);

  useEffect(() => {
    socket.on("SendMetrics", (msg) => {
      //el devices es para acceder a cada dispositivo por grupo y el channel define a cada integrante del devices/grupo
      updateDataHabla(msg.data.devices);
      // console.log(msg.data.devices)
    });
  }, []);

  return (
    <div>
      <Grid container justifyContent="center" m={1}>
        {dataHabla.map((canales, i) => (
          <>
            <Grid item xs={2.3} mr={6} key={i}>
              <h2
                style={{ textAlign: "center", width: "100%", margin: "14px" }}
              >
                {" "}
                Grupo {i + 1}
              </h2>
              <div style={{ textAlign: "center" }}>
                <Button
                  sx={{ width: "270px", height: "270px" }}
                  onClick={() => {
                    setSelectedItem(i);
                  }}
                >
                  <NetworkMultiGraph data={canales}> </NetworkMultiGraph>{" "}
                </Button>{" "}
              </div>
              <Modal
                open={selectedItem === i}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={style2}> Gráfico detallado multimétrica</div>
                  <NetworkMultiGraph data={canales}></NetworkMultiGraph>
                </Box>
              </Modal>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default Multimetrica;
