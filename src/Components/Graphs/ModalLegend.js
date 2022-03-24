import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

const ModalLegend = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 400, height: 40 };
  const dataExp = useSelector((store) => store.DatosExp.array);

  //const color = d3.scaleOrdinal(d3.schemeCategory10);
  //const color = d3.scaleOrdinal(["#2499EF", "#FF9777", "#FF6B93", "#6BD098"]);
  const color = ["#2499EF", "#FF9777", "#FF6B93", "#6BD098"];
  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("height", dimensions.height)
      .attr("width", dimensions.width);
    //.style("background-color", "white");

    svg
      .selectAll("mydots")
      .data(
        dataExp.fase[dataExp.experimento.faseActiva].idGrupos[props.data]
          .participantes
      )
      .join("circle")
      .attr("cx", function (d, i) {
        return 50 + d.dispositivos[0].canal * 80;
      })
      .attr("cy", 10) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function (d) {
        return color[d.dispositivos[0].canal];
      });

    // Add one dot in the legend for each name.
    svg
      .selectAll("mylabels")
      .data(
        dataExp.fase[dataExp.experimento.faseActiva].idGrupos[props.data]
          .participantes
      )
      .join("text")
      .attr("x", function (d, i) {
        return 30 + d.dispositivos[0].canal * 80;
      })
      .attr("y", 30) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d) {
        return color[d.dispositivos[0].canal];
      })
      .text(function (d) {
        return d.descripcion;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }, [props.data]);

  return <svg ref={areaChart}></svg>;
};

export default ModalLegend;
