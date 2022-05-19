import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import happy from "../../Utilities/feliz.png";
import sad from "../../Utilities/sad.png";
import angry from "../../Utilities/angry.png";
import surprise from "../../Utilities/surprise.png";
import neutral from "../../Utilities/neutral.png";
import disgust from "../../Utilities/disgust.png";
import fear from "../../Utilities/fear.png";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import flecha1 from "../../Utilities/flecha.png";

const Multi = (props) => {
  const metricasHabla = useSelector((store) => store.metricaHabla.array);
  const metricasPostura = useSelector(
    (store) => store.metricaHabla.array_posturas
  );
  const metricasExpresiones = useSelector(
    (store) => store.metricaHabla.array_expresiones
  );
  const dataExp = useSelector((store) => store.DatosExp.array);
  const areaChart = useRef(null);
  const dimensions = { width: 270, height: 270 };
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  var mycolors = ["#FFA500", "#008000"];

  useEffect(() => {
    var strokeWidth = [];
    metricasHabla[props.tiempo][props.grupos].trace_delta.map(
      (canales, i) => (strokeWidth[i] = canales.weigth)
    );

    var maxWidth = d3.max(strokeWidth, function (d) {
      return d;
    });
    const pie = (data) => d3.pie().value((d) => d.value)(data);
    const arc = (radio) => d3.arc().innerRadius(0).outerRadius(radio);

    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");

    const lineaScale = d3.scaleLinear().domain([0, maxWidth]).range([1, 8]);

    const lineaTransparency = d3
      .scaleLinear()
      .domain([0, maxWidth])
      .range([0, 1]);

    var g = svg
      .select(".chart")
      .selectAll("g.arc")
      .data(props.cantidad)
      .join("g")
      .attr("class", "arc")
      .raise()
      .attr("transform", function (_, i) {
        return `translate(${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.cantidad.length + 0.75))
        }, ${(dimensions.height / 4) * Math.sin(2 * Math.PI * (i / props.cantidad.length + 0.75))})`;
      });

    const nodosImagenes = svg
      .select(".chart")
      .selectAll("circle")
      //.data(metricasExpresiones[props.sliderExpresiones][props.grupos].channel)
      //.data(props.expresiones[props.sliderExpresiones][props.grupos].channel)
      .data(props.expresiones[props.tiempo][props.grupos].channel)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + (d.channelId - 1);
      })
      .attr("stroke-opacity", 0)
      .attr("fill", function (d) {
        switch (d.valor) {
          case "Expresion_angry":
            return "url(#angry)";
            break;
          case "Expresion_disgust":
            return "url(#disgust)";
            break;
          case "Expresion_fear":
            return "url(#fear)";
            break;
          case "Expresion_surprise":
            return "url(#surprise)";
            break;
          case "Expresion_sad":
            return "url(#sad)";
            break;
          case "Expresion_happy":
            return "url(#happy)";
            break;
          case "Expresion_neutral":
            return "url(#neutral)";
            break;
        }
      })
      .attr("cx", function (d, i) {
        return (
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.cantidad.length + 0.75))
        );
      })
      .attr("cy", function (d, i) {
        return (
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.cantidad.length + 0.75))
        );
      })
      .raise()
      .attr("r", 25);
    /*  .each(function (d, i) {
        if (d.talk == 1) {
          svg
            .select("#name" + i)
            .transition()
            .duration(700)
            .attr("stroke", "#008000")
            .attr("stroke-width", "14")
            .attr("stroke-opacity", 0.3)
            .attr("paint-order", "stroke");
        }
      }) */
    const imagenes = svg
      .select(".chart")
      .selectAll("image.flecha1")
      //.data(props.postura[props.sliderPostura][props.grupos].channel)
      //.data(props.postura[props.tiempo][props.grupos].channel)
      .data(metricasPostura[props.tiempoPostura][props.grupos].channel)
      .join("svg:image")
      .attr("class", "flecha1")
      .attr("xlink:href", flecha1)
      .attr("width", "10")
      .attr("height", "10")
      .raise()
      .attr("x", function (d, i) {
        return (
          (dimensions.width / 4) *
            Math.cos(2 * Math.PI * (i / props.cantidad.length + 0.75)) +
          10 * Math.sin(0)
        );
      })
      .attr("y", function (d, i) {
        return (
          (dimensions.height / 4) *
            Math.sin(2 * Math.PI * (i / props.cantidad.length + 0.75)) -
          50 * Math.cos(0)
        );
      });
    var tween = function (angle, i) {
      return d3.interpolateString(
        `rotate(0, ${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.cantidad.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.cantidad.length + 0.75))
        }`,
        `rotate(${angle},${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.cantidad.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.cantidad.length + 0.75))
        })`
      );
    };
    imagenes
      .transition()
      .duration(1)
      .attrTween("transform", (d, i) => tween(90 * i + 174 + d.faceAngle, i)); // tiene que ser 180 grados .

    const linea = svg
      .select(".chart")
      .selectAll("path.line")
      //.data(metricasHabla[props.sliderHabla][props.grupos].trace_delta)
      .data(metricasHabla[props.tiempo][props.grupos].trace_delta)
      .join("path")
      .attr("class", "line")
      .style("fill-opacity", 0)
      .attr("stroke", "#bcbfc4")
      .style("stroke-opacity", function (d) {
        return lineaTransparency(d.weigth);
      })
      .attr("d", function (d) {
        var dx =
            d3.select("#name" + (d.target - 1)).attr("cx") -
            d3.select("#name" + (d.source - 1)).attr("cx"),
          dy =
            d3.select("#name" + (d.target - 1)).attr("cy") -
            d3.select("#name" + (d.source - 1)).attr("cy"),
          dr = Math.sqrt(dx * dx + dy * dy);

        return (
          "M" +
          d3.select("#name" + (d.source - 1)).attr("cx") +
          "," +
          d3.select("#name" + (d.source - 1)).attr("cy") +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          d3.select("#name" + (d.target - 1)).attr("cx") +
          "," +
          d3.select("#name" + (d.target - 1)).attr("cy")
        );
      })
      .attr("d", function (d) {
        var pl = this.getTotalLength(),
          r = 12 + 25,
          m = this.getPointAtLength(pl - r);

        var dx = m.x - d3.select("#name" + (d.source - 1)).attr("cx"),
          dy = m.y - d3.select("#name" + (d.source - 1)).attr("cy"),
          dr = Math.sqrt(dx * dx + dy * dy);

        return (
          "M" +
          d3.select("#name" + (d.source - 1)).attr("cx") +
          "," +
          d3.select("#name" + (d.source - 1)).attr("cy") +
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
      .attr("stroke-width", function (d, i) {
        return lineaScale(d.weigth);
      })

      .attr("marker-end", "url(#arrow)");

    const nodo = g
      .selectAll("path.pie")
      /* .data(function (d, i) {
        //return pie(d.acumulate_posture);
        return pie(
          metricasPostura[props.sliderPostura - 1][props.grupos].channel[i]
            .acumulate_posture
        );
      }) */
      /*  .data(function (d, i) {
        //return pie(d.acumulate_posture);
        return pie(
          props.postura[props.sliderPostura][props.grupos].channel[i]
            .acumulate_posture
        );
      }) */

      .data(function (d, i) {
        //return pie(d.acumulate_posture);
        /*  return pie(
          props.postura[props.tiempoPostura][props.grupos].channel[i]
            .acumulate_posture
        ); */
        return pie(
          metricasPostura[props.tiempoPostura][props.grupos].channel[i]
            .acumulate_posture
        );
      })

      .join("path")
      .attr("class", "pie")
      .attr("fill", function (d, i) {
        return mycolors[i];
      })
      .attr("d", arc(25));
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
    //console.log(props.habla[props.sliderPostura - 1][props.grupos]);
    //console.log(metricasHabla[props.sliderPostura - 1][props.grupos]);
  }, [props.tiempoPostura, props.tiempo]);

  return (
    <svg ref={areaChart} style={{ borderRadius: "10px" }}>
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
            fill="#bcbfc4"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>

          <pattern
            id="flecha1"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <image
              xlinkHref={flecha1}
              width="100"
              height="100"
              preserveAspectRatio="none"
            ></image>
          </pattern>
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

export default Multi;
