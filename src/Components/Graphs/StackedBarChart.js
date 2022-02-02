import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max
} from "d3";

  const keys = ["totalTimeEfectv", "totalTimeSilenc"];
  
  const colors = {
    totalTimeEfectv: "#008000",
    totalTimeSilenc: "#25DBFD"
  };

 const StackedBarChart = props  => {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    var time =[]

        props.data.channel.map((canales, i) => (
          time[i] = {"totalTimeEfectv":canales.totalTimeEfectv, "totalTimeSilenc":canales.totalTimeSilenc}
          ));
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(time);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    const yScale = scaleLinear().domain([0,100]).range([height, 0]);

    const xScale = scaleBand()
      .domain(time.map((d,i) => "S"+ i ))
      .range([0, width])
      .padding(0.46);

    const xAix = axisBottom(xScale);
    const yAix = axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height}) `)
      .call(xAix);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${20}, 0 )`)
      .call(yAix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence,i) => xScale("S"+i))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

      console.log("arreglo: ",time)
  }, [props.data]);

  return (
    <>
    <Box
      sx={{
        border: "2px solid red",
        borderRadius: "10px",
        width: "270px",
        height: "270px",
      }}>
      <div
        ref={wrapperRef}
        style={{ width: "250px", height: "250px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      </Box>
    </>
  );
};
export default StackedBarChart;