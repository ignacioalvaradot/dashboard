import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useSelector } from "react-redux";

const NetworkGraph = ({ data, grupos }) => {
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };
  const dataExp = useSelector((store) => store.DatosExp.array);
  const integrantes = ["Pedro", "Juan", "Maria", "Jose"];

  useEffect(() => {
    const tooldiv = d3.select("#chartArea" + grupos);

    var radio = [];
    var strokeWidth = [];
    data.channel.map((canales, i) => (radio[i] = canales.numeroInterv));
    data.trace_delta.map((canales, i) => (strokeWidth[i] = canales.weigth));

    var maxRadius = d3.max(radio, function (d) {
      return d;
    });
    var maxWidth = d3.max(strokeWidth, function (d) {
      return d;
    });

    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");

    const nodoScale = d3.scaleLinear().domain([0, maxRadius]).range([4, 25]);

    const lineaScale = d3.scaleLinear().domain([0, maxWidth]).range([1, 8]);

    const lineaTransparency = d3
      .scaleLinear()
      .domain([0, maxWidth])
      .range([0, 1]);

    const nodoTransparency = d3
      .scaleLinear()
      .domain([0, maxRadius])
      .range([0, 0.5]);

    const nodo = svg
      .select(".chart")
      .selectAll("circle")
      .data(data.channel)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + (d.channelId - 1);
      })
      .attr("fill", (d) =>
        d3.color("orange").brighter(nodoTransparency(d.numeroInterv))
      )
      .attr("stroke-opacity", 0)
      .raise()
      .attr("cx", function (d, i) {
        return (
          (dimensions.width / 4) *
          Math.cos(2 * Math.PI * (i / data.channel.length + 0.75))
        );
      })
      .attr("cy", function (d, i) {
        return (
          (dimensions.height / 4) *
          Math.sin(2 * Math.PI * (i / data.channel.length + 0.75))
        );
      })

      .each(function (d, i) {
        if (d.valor == 1) {
          svg
            .select("#name" + (d.channelId - 1))
            .attr("stroke", "#008000")
            .attr("stroke-width", "14")
            .attr("stroke-opacity", 0.3)
            .attr("paint-order", "stroke");
        }
      })

      .attr("r", function (d) {
        return nodoScale(d.numeroInterv);
      });

    const linea = svg
      .select(".chart")
      .selectAll("path.line")
      .data(data.trace_delta)
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

        var offsetX = (dx * d3.select("#name" + (d.target - 1)).attr("r")) / dr;
        var offsetY = (dy * d3.select("#name" + (d.target - 1)).attr("r")) / dr;
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
          r = 12 + 30,
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

    const texto = svg
      .select(".chart")
      .selectAll("text")

      .data(integrantes)
      .join("text")
      .attr("id", function (d, i) {
        return "texto" + i;
      })
      .style("text-anchor", "middle")
      .raise()

      .attr("transform", function (d, i) {
        if (d3.select("#name" + i).empty() === false) {
          return `translate(${d3.select("#name" + i).attr("cx")}, ${
            d3.select("#name" + i).attr("cy") - 37
          })`;
        }
      })
      .text(function (d, i) {
        return d;
      });

    const lineas = svg
      .select(".chart")
      .selectAll("line")
      .data(integrantes)
      .join("line")
      .attr("x1", function (d, i) {
        return d3.select("#texto" + 0).attr("cx");
      })
      .attr("x2", function (d, i) {
        return d3.select("#texto" + 0).attr("cx" + 5);
      })
      .attr("y1", function (d, i) {
        return d3.select("#texto" + 0).attr("cy");
      })
      .attr("y2", function (d, i) {
        return d3.select("#texto" + 0).attr("cy" + 5);
      })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px");
  }, [data]);

  return (
    <>
      <div
        id={`chartArea${grupos}`}
        style={{
          visibility: "hidden",
          position: "absolute",
          backgroundColor: "red",
        }}
      ></div>
      <svg style={{ borderRadius: "10px" }} ref={areaChart}>
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
    </>
  );
};

export default NetworkGraph;
