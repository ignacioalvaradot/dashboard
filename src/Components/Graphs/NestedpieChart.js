import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";

const NetworkPostGraph = (props) => {
  const areaChart = useRef(null);
  const dimensions = { width: 270, height: 270 };
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  var mycolors = ["#FFA500", "#008000"];

  useEffect(() => {
    const pie = (data) => d3.pie().value((d) => d.numeroInterv)(data);
    const arc = (radio) => d3.arc().innerRadius(0).outerRadius(radio);

    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");
      

    var g = svg
      .select(".chart")
      .selectAll("g.arc")
      .data(props.data.channel)
      .attr("class", "arc");

    const nodo = g
      .selectAll("path.pie")
      .data(function (d) {
        return pie(d);
      })

      .join("path")
      .attr("class", "pie")
      .attr("fill", function (d, i) {
        return mycolors[i];
      })
      .attr("d", arc(25));

      console.log(pie(props.data.channel[0]))

  }, [props.data]);

  return (
    <Box
      sx={{
        border: "2px solid red",
        borderRadius: "10px",
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <svg style={{ borderRadius: "10px" }} ref={areaChart}>
        <g
          className="chart"
          transform={`translate(${dimensions.width / 2} ${
            dimensions.height / 2
          })`}
        ></g>
      </svg>
    </Box>
  );
};

export default NetworkPostGraph;
