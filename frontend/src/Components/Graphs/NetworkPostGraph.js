import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import flecha1 from "../../Utilities/flecha.png";
import { useSelector } from "react-redux";

const NetworkPostGraph = (props) => {
  const areaChart = useRef(null);
  const dimensions = { width: 270, height: 270 };
  const dataExp = useSelector((store) => store.DatosExp.array);
  var mycolors = ["#FFA500", "#008000"];

  useEffect(() => {
    const pie = (data) => d3.pie().value((d) => d.value)(data);
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
      .join("g")
      .attr("class", "arc")
      .attr("id", function (d, i) {
        //return "name" + i;
        return "name" + (d.channelId - 1);
      })
      .raise()
      .attr("transform", function (_, i) {
        return `translate(${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        }, ${(dimensions.height / 4) * Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))})`;
      });

    const imagenes = svg
      .select(".chart")
      .selectAll("image")
      .data(props.data.channel)
      .join("svg:image")
      .attr("class", "image")
      .attr("xlink:href", flecha1)
      .attr("width", "10")
      .attr("height", "10")
      .raise()
      .attr("x", function (d, i) {
        return (
          (dimensions.width / 4) *
            Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75)) +
          10 * Math.sin(0)
        );
      })
      .attr("y", function (d, i) {
        return (
          (dimensions.height / 4) *
            Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75)) -
          50 * Math.cos(0)
        );
      });
    var tween = function (angle, i) {
      return d3.interpolateString(
        `rotate(0, ${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))
        }`,
        `rotate(${angle},${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))
        })`
      );
    };

    imagenes
      .transition()
      .duration(1)
      .attrTween("transform", (d, i) => tween(90 * i + 174 + d.faceAngle, i)); // tiene que ser 180 grados .
    // eslint-disable-next-line
    const nodo = g
      .selectAll("path.pie")
      .data(function (d) {
        return pie(d.acumulate_posture);
      })

      .join("path")
      .attr("class", "pie")
      .attr("fill", function (d, i) {
        return mycolors[i];
      })
      .attr("d", arc(25));
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
            (dimensions.width / 4) *
              Math.cos(
                2 * Math.PI * (d.target / props.data.channel.length + 0.75)
              ) -
            (dimensions.width / 4) *
              Math.cos(
                2 * Math.PI * (d.source / props.data.channel.length + 0.75)
              ),
          dy =
            (dimensions.height / 4) *
              Math.sin(
                2 * Math.PI * (d.target / props.data.channel.length + 0.75)
              ) -
            (dimensions.height / 4) *
              Math.sin(
                2 * Math.PI * (d.source / props.data.channel.length + 0.75)
              ),
          dr = Math.sqrt(dx * dx + dy * dy);
        return (
          "M" +
          (dimensions.width / 4) *
            Math.cos(
              2 * Math.PI * (d.source / props.data.channel.length + 0.75)
            ) +
          "," +
          (dimensions.height / 4) *
            Math.sin(
              2 * Math.PI * (d.source / props.data.channel.length + 0.75)
            ) +
          "A" +
          dr +
          "," +
          dr +
          " 0 0,1 " +
          (dimensions.width / 4) *
            Math.cos(
              2 * Math.PI * (d.target / props.data.channel.length + 0.75)
            ) +
          "," +
          (dimensions.height / 4) *
            Math.sin(
              2 * Math.PI * (d.target / props.data.channel.length + 0.75)
            )
        );
      })
      .attr("d", function (d) {
        var pl = this.getTotalLength(),
          r = 20,
          m = this.getPointAtLength(pl - r);

        var dx =
            m.x -
            (dimensions.width / 4) *
              Math.cos(
                2 * Math.PI * (d.source / props.data.channel.length + 0.75)
              ),
          dy =
            m.y -
            (dimensions.height / 4) *
              Math.sin(
                2 * Math.PI * (d.source / props.data.channel.length + 0.75)
              ),
          dr = Math.sqrt(dx * dx + dy * dy);

        return (
          "M" +
          (dimensions.width / 4) *
            Math.cos(
              2 * Math.PI * (d.source / props.data.channel.length + 0.75)
            ) +
          "," +
          (dimensions.height / 4) *
            Math.sin(
              2 * Math.PI * (d.source / props.data.channel.length + 0.75)
            ) +
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
        switch (d.type) {
          case "open":
            return "#FFA500";

          case "close":
            return "#008000";
        }
      })
      .attr("stroke-width", 8);
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
          /*  return `translate(${
            d3.select("#name" + d.dispositivos[0].canal).attr("transform")
              .translate[0]
          }, ${d3.select("#name" + d.dispositivos[0].canal).attr("cy") - 37})`; */
          return `translate(${
            (dimensions.width / 4) *
            Math.cos(
              2 *
                Math.PI *
                (d.dispositivos[0].canal / props.data.channel.length + 0.75)
            )
          }, ${
            (dimensions.height / 4) *
              Math.sin(
                2 *
                  Math.PI *
                  (d.dispositivos[0].canal / props.data.channel.length + 0.75)
              ) -
            37
          })`;
        }

        //return `translate(${d3.select( '#name' + d.dispositivos[0].canal).attr('cx')  }, ${d3.select( '#name' + d.dispositivos[0].canal).attr('cy') - (37) })`
      })
      .text(function (d, i) {
        return d.descripcion;
      });
    /* console.log(
      dataExp.fase[dataExp.experimento.faseActiva].idGrupos[0].participantes[1]
    ); */
    // eslint-disable-next-line
  }, [props.data]);

  return (
    <svg style={{ borderRadius: "10px" }} ref={areaChart}>
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
      <g
        className="chart"
        transform={`translate(${dimensions.width / 2} ${
          dimensions.height / 2
        })`}
      ></g>
    </svg>
  );
};

export default NetworkPostGraph;
