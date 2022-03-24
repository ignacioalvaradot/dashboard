import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

const Pie = (props) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const dataExp = useSelector((store) => store.DatosExp.array);

  const createPie = d3
    .pie()
    .value((d) => d.numeroInterv)
    .sort(null);

  const createPie2 = d3
    .pie()
    .value((d) => d.totalTimeInterv)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const createArc2 = d3.arc().innerRadius(0).outerRadius(50);
  //const colors = d3.scaleOrdinal(d3.schemeCategory10);
  //const colors = d3.scaleOrdinal(["#2499EF", "#FF9777", "#FF6B93", "#6BD098"]);
  const colors = ["#2499EF", "#FF9777", "#FF6B93", "#6BD098"];
  const format = d3.format(".2f");

  useEffect(() => {
    const order = [];
    props.data.channel.map((data, i) => (order[i] = data.channelId - 1));
    const data = createPie(props.data.channel);
    const data2 = createPie2(props.data.channel);
    const group = d3.select(ref.current);
    const group2 = d3.select(ref2.current);
    const groupWithData = group.selectAll("g.arc").data(data);
    const groupWithData2 = group2.selectAll("g.arc").data(data2);

    const tooldiv = d3.select("#ModalArea");
    /* .append('div')
    .style('visibility','hidden')
    .style('position','absolute')
    .style('background-color','red') */

    groupWithData.exit().remove();
    groupWithData2.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const groupWithUpdate2 = groupWithData2
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    const path2 = groupWithUpdate2
      .append("path")
      .merge(groupWithData2.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors[order[i]])
      .on("mouseover", (e, d) => {
        console.log(e);
        console.log(d);
        tooldiv
          .style("visibility", "visible")
          //.text(`El número de intervenciones <br> es de: ${d.data.numeroInterv}`)
          //.text("El número de intervenciones <br> es de" +  d.data.numeroInterv)
          .html(
            dataExp.fase[dataExp.experimento.faseActiva].idGrupos[props.grupos]
              .participantes[d.index].descripcion +
              " tiene: " +
              d.data.numeroInterv +
              " <br>intervenciones<br> y " +
              Math.round(d.data.totalTimeInterv) +
              " tiempo total<br> de intervenciones"
          );
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("top", e.pageY - 150 + "px")
          .style("left", e.pageX - 300 + "px");
      })

      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });

    path2
      .attr("class", "arc")
      .attr("d", createArc2)
      .attr("fill", (d, i) => colors[order[i]])
      .on("mouseover", (e, d) => {
        console.log(e);
        console.log(d);
        tooldiv
          .style("visibility", "visible")
          //.text(`El número de intervenciones <br> es de: ${d.data.numeroInterv}`)
          //.text("El número de intervenciones <br> es de" +  d.data.numeroInterv)
          .html(
            dataExp.fase[dataExp.experimento.faseActiva].idGrupos[props.grupos]
              .participantes[d.index].descripcion +
              " tiene: " +
              d.data.numeroInterv +
              " <br>intervenciones<br> y " +
              Math.round(d.data.totalTimeInterv) +
              " tiempo total<br> de intervenciones"
          );
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("top", e.pageY - 150 + "px")
          .style("left", e.pageX - 300 + "px");
      })

      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });

    /*     const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => format(toString(d.valor))); */
  }, [props.data]);

  return (
    <>
      <div
        id="ModalArea"
        style={{
          visibility: "hidden",
          position: "absolute",
          backgroundColor: "white",
          border: "solid",
          borderWidth: "2px",
          borderRadius: "5px",
          padding: "5px",
        }}
      ></div>
      <svg
        style={{ borderRadius: "10px" }}
        width={props.width}
        height={props.height}
      >
        <g
          ref={ref}
          transform={`translate(${props.width / 2},${props.height / 2})`}
        />
        <g
          ref={ref2}
          transform={`translate(${props.width / 2},${props.height / 2})`}
        />
      </svg>
    </>
  );
};

export default Pie;
