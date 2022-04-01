import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max,
} from "d3";
import * as d3 from "d3";

const keys = ["totalTimeEfectv", "totalTimeSilenc"];
const color = ["#2499EF", "#FF9777", "#FF6B93", "#6BD098"];

const colors = {
  totalTimeEfectv: "#008000",
  totalTimeSilenc: "#25DBFD",
};

/* const colors = {
  totalTimeEfectv: "#008000",
  totalTimeSilenc: "#25DBFD",
}; */

//const color = d3.scaleOrdinal(["#2499EF", "#FF9777", "#FF6B93", "#6BD098"]);

const StackedBarChart = ({ data, grupos }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dataExp = useSelector((store) => store.DatosExp.array);
  const nombres = [];

  dataExp.fase[dataExp.experimento.faseActiva].idGrupos[
    grupos
  ].participantes.map(
    (data, i) => (nombres[data.dispositivos[0].canal] = data.descripcion)
  );

  useEffect(() => {
    var time = [];
    var promEfectv = 0;
    var promSilenc = 0;
    var stacks = [];
    const order = [];

    data.channel.map(
      (data, i) => (
        (promEfectv = promEfectv + data.totalTimeEfectv),
        (promSilenc = promSilenc + data.totalTimeSilenc),
        (order[i] = data.channelId - 1)
      )
    );

    data.channel.map(
      (canales, i) =>
        (stacks[i] = {
          totalTimeEfectv: (canales.totalTimeEfectv / promEfectv) * 100,
          totalTimeSilenc: (canales.totalTimeSilenc / promSilenc) * 100,
        })
      //console.log(stacks[i])
    );

    //console.log(promEfectv, promSilenc);
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(stacks);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    const yScale = scaleLinear().domain([0, 200]).range([height, 0]);

    const xScale = scaleBand()
      .domain(stacks.map((d, i) => nombres[i]))
      .range([0, width])
      .padding(0.46);

    const xAix = axisBottom(xScale);
    const yAix = axisLeft(
      scaleLinear().domain([0, 100]).range([height, 0])
    ).ticks(5);

    svg
      .select(".x-axis")
      .attr("transform", `translate(25, ${height + 10}) `)
      .call(xAix);
    svg.select(".y-axis").attr("transform", `translate(${25}, 10 )`).call(yAix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      //.attr("class", "layer")
      .attr("class", (_, i) => `layer ${i} `)
      .attr("fill", (layer, i) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("stroke", (d, i) => color[order[i]])
      .attr("stroke-width", "2")
      /* .attr("fill", function (d, i) {
        return d3.selectAll(".layer 0").attr("fill", color[i]);
      }) */
      .attr("x", (sequence, i) => xScale(nombres[order[i]]) + 25)
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]) + 10)
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
    /* .on("mouseover", function (d, i) {
        d3.select(this).attr("fill", d3.color("blue").brighter(100));
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", (layer) => colors[layer.key]);
      }); */

    //console.log(dataExp.fase[dataExp.experimento.faseActiva].idGrupos[grupos].participantes)

    //console.log("arreglo: ",time)
    //console.log(stacks[0])
  }, [data]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: "250px", height: "250px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "110%", height: "120%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};
export default StackedBarChart;
