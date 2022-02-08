import React, { useState, useEffect } from "react";
import NetworkExpGraph from "./../Graphs/NetworkExpGraph";
import SpiderGraph from "./../Graphs/SpiderGraph";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.2:200/expresiones";
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
const Expresion = () => {
  const [data, updateData] = useState([]);
  const [finaldata, setFinaldata] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const handleClose = () => setSelectedItem(null);

  const tick = () => {
    setFinaldata(data);
  };

  useEffect(() => {
    const interval = setInterval(tick, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [finaldata]);

  useEffect(() => {
    socket.on("SendMetrics", (msg) => {
      updateData(msg.data.devices);
    });
    return () => {
      updateData({});
    };
  }, []);
  return (
    <div>
      <Grid container justifyContent="center" m={1}>
        {data.map((canales, i) => (
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
                  {" "}
                  <NetworkExpGraph data={canales}> </NetworkExpGraph>{" "}
                </Button>{" "}
              </div>{" "}
              <Modal
                open={selectedItem === i}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={style2}> Gráfico detallado expresión</div>
                  <SpiderGraph data={canales}> </SpiderGraph>
                </Box>
              </Modal>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default Expresion;
