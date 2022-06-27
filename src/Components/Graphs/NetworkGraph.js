import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import flecha1 from "../../Utilities/flecha.png";
var elements = [];
const NetworkGraph = (props) => {
  const areaChart = useRef(null);
  const dimensions = { width: 270, height: 270 };

  var mycolors = ["#FFA500", "#008000"];

  useEffect(() => {
    props.data.channel.map((data, i) => (elements[i] = data.faceAngle));
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
      .raise()
      .attr("transform", function (_, i) {
        return `translate(${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / props.data.channel.length + 0.75))
        }, ${(dimensions.height / 4) * Math.sin(2 * Math.PI * (i / props.data.channel.length + 0.75))})`;
      });

    var angulo = Math.random();

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
      .duration(200)
      .attrTween("transform", (d, i) => tween(90 * i + 174 + d.faceAngle, i)); // tiene que ser 180 grados .
    /* .attrTween("transform", (d, i) => {
        switch (i) {
          case 0:
            return tween(d.faceAngle, i);
            break;
      }}); */
    /* 
    const flecha = g

      .selectAll("g.image")
      .data(function (d) {
        return [d.faceAngle];
      })
      .join("g")
      .attr("class", "image")
      .attr("transform", function (d, i) {
        return `translate(${
          (dimensions.width / 8) * Math.cos(2 * Math.PI * 0.75) +
          90 * Math.sin(0)
        }, ${(dimensions.height / 8) * Math.sin(2 * Math.PI * 0.75) - 90 * Math.cos(0)})`;
      });

    const inside = flecha
      .selectAll("g.inside")
      .data(function (d) {
        return [d.faceAngle];
      })
      .join("g")
      .attr("class", "inside");

    const imagen = flecha
      .selectAll("image")
      .data(function (d) {
        return [d.faceAngle];
      })
      .join("svg:image")
      .attr("xlink:href", "#flecha1"); */

    /* .attr("transform", function (d, i) {
        return `translate(${
          (dimensions.width / 8) * Math.cos(2 * Math.PI * 0.75)
        }, ${(dimensions.height / 8) * Math.sin(2 * Math.PI * 0.75)})`;
      }) */
    /* const flechas = inside
      .selectAll("path.arrow")
      .data(function (d) {
        return [d];
      })
      .join("path")
      .attr("class", "arrow")
      .attr("d", sym);
    //.attr("marker-end", "url(#arrow)")
    var tween = function (d, i, a) {
      return d3.interpolateString(
        `rotate(0, ${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (0 / props.data.channel.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (0 / props.data.channel.length + 0.75))
        }`,
        `rotate(0,${
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (0 / props.data.channel.length + 0.75))
        }, ${
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (0 / props.data.channel.length + 0.75))
        })`
      );
    }; */
    /* var tween = function (d, i, a) {
      return d3.interpolateString("rotate(0, 0, 0)", "rotate(100, 0, 0)");
    }; */
    //inside.transition().duration(200).attrTween("transform", tween);
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
    //console.log(angulo);
    console.log(elements);
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
      <g className="flechaGroup"></g>
      <g
        className="chart"
        transform={`translate(${dimensions.width / 2} ${
          dimensions.height / 2
        })`}
      >
        <g className="arrow">
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
          </defs>
        </g>
      </g>
    </svg>
  );
};

export default NetworkGraph;
