import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import happy from "../../Utilities/feliz.png";
import sad from "../../Utilities/sad.png";
import angry from "../../Utilities/angry.png";
import surprise from "../../Utilities/surprise.png";
import neutral from "../../Utilities/neutral.png";
import disgust from "../../Utilities/disgust.png";
import fear from "../../Utilities/fear.png";
import { useSelector } from "react-redux";

const NetworkExpGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };
  const dataExp = useSelector((store) => store.DatosExp.array);

  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");
    // eslint-disable-next-line
    const nodo = svg
      .select(".chart")
      .selectAll("circle")
      .data(props.data.channel)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + (d.channelId - 1);
      })
      .style("fill", function (d) {
        // eslint-disable-next-line
        switch (d.valor) {
          case "Expresion_angry":
            return "#F30606";

          case "Expresion_disgust":
            return "#4ECE2B";

          case "Expresion_fear":
            return "#A657A8";

          case "Expresion_surprise":
            return "#E68714";

          case "Expresion_sad":
            return "#33AAFF";

          case "Expresion_happy":
            return "#FFCE36";

          case "Expresion_neutral":
            return "#737273";
        }
      })
      .attr("cx", function (d, i) {
        return (
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        );
      })
      .attr("cy", function (d, i) {
        return (
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))
        );
      })
      .raise()
      .attr("r", 25);
    // eslint-disable-next-line
    const nodosImagenes = svg
      .select(".chart")
      .selectAll("circle2")
      .data(props.data.channel)
      .join("circle")
      .attr("id", function (_, i) {
        return "name2" + i;
      })
      .attr("fill", function (d) {
        // eslint-disable-next-line
        switch (d.valor) {
          case "Expresion_angry":
            return "url(#angry)";

          case "Expresion_disgust":
            return "url(#disgust)";

          case "Expresion_fear":
            return "url(#fear)";

          case "Expresion_surprise":
            return "url(#surprise)";

          case "Expresion_sad":
            return "url(#sad)";

          case "Expresion_happy":
            return "url(#happy)";

          case "Expresion_neutral":
            return "url(#neutral)";
        }
      })
      .attr("cx", function (d, i) {
        return (
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        );
      })
      .attr("cy", function (d, i) {
        return (
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))
        );
      })
      .raise()
      .attr("r", 25);
    // eslint-disable-next-line
    const linea = svg
      .select(".chart")
      .selectAll("path.line")
      .data(props.data.trace_delta)
      .join("path")
      .attr("class", "line")
      .style("fill-opacity", 0)
      .attr("d", function (d) {
        var dx =
            d3.select("#name" + d.target).attr("cx") -
            d3.select("#name" + d.source).attr("cx"),
          dy =
            d3.select("#name" + d.target).attr("cy") -
            d3.select("#name" + d.source).attr("cy"),
          dr = Math.sqrt(dx * dx + dy * dy);
        return (
          "M" +
          d3.select("#name" + d.source).attr("cx") +
          "," +
          d3.select("#name" + d.source).attr("cy") +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          d3.select("#name" + d.target).attr("cx") +
          "," +
          d3.select("#name" + d.target).attr("cy")
        );
      })
      .attr("d", function (d) {
        var pl = this.getTotalLength(),
          r = 20,
          m = this.getPointAtLength(pl - r);

        var dx = m.x - d3.select("#name" + d.source).attr("cx"),
          dy = m.y - d3.select("#name" + d.source).attr("cy"),
          dr = Math.sqrt(dx * dx + dy * dy);

        return (
          "M" +
          d3.select("#name" + d.source).attr("cx") +
          "," +
          d3.select("#name" + d.source).attr("cy") +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          m.x +
          "," +
          m.y
        );
      })
      .attr("stroke", function (d) {
        // eslint-disable-next-line
        switch (d.expresion) {
          case "Expresion_angry":
            return "#F30606";

          case "Expresion_disgust":
            return "#4ECE2B";

          case "Expresion_fear":
            return "#A657A8";

          case "Expresion_surprise":
            return "#E68714";

          case "Expresion_sad":
            return "#33AAFF";

          case "Expresion_happy":
            return "#FFCE36";

          case "Expresion_neutral":
            return "#737273";
        }
      })
      .attr("stroke-width", (d) => d.weigth);
    // eslint-disable-next-line
    const texto = svg
      .select(".chart")
      .selectAll("text")
      //.data(props.data.channel)
      .data(
        dataExp.fase[dataExp.experimento.faseActiva].idGrupos[props.grupos]
          .participantes
      )
      .join("text")
      .style("text-anchor", "middle")
      .raise()
      /* .style("visibility", "hidden")
      .style("visibility", function(d,i) { 
        if(d3.select( '#name' + d.dispositivos[0].canal).empty() === false) { 
          return ("visible")
      }}) */

      .attr("transform", function (d, i) {
        if (d3.select("#name" + d.dispositivos[0].canal).empty() === false) {
          return `translate(${d3
            .select("#name" + d.dispositivos[0].canal)
            .attr("cx")}, ${
            d3.select("#name" + d.dispositivos[0].canal).attr("cy") - 37
          })`;
        }

        //return `translate(${d3.select( '#name' + d.dispositivos[0].canal).attr('cx')  }, ${d3.select( '#name' + d.dispositivos[0].canal).attr('cy') - (37) })`
      })
      .text(function (d, i) {
        return d.descripcion;
      });
    // eslint-disable-next-line
  }, [props.data]);

  return (
    <svg style={{ borderRadius: "10px" }} ref={areaChart}>
      <g
        className="chart"
        transform={`translate(${dimensions.width / 2} ${
          dimensions.height / 2
        })`}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="3"
            markerHeight="3"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
          <pattern
            id="happy"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={happy}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="sad"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={sad}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="angry"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={angry}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="surprise"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={surprise}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="neutral"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={neutral}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="disgust"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={disgust}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>

          <pattern
            id="fear"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={fear}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>
        </defs>
      </g>
    </svg>
  );
};

export default NetworkExpGraph;
