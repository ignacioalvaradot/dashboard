import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import resize from "./useResizeObserver";

const NetworkGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };
  //const dimensions= resize(areaChart);

  function triangleposition(cx, cy) {
    var TriangleX = cx - 30 * Math.sin(0);
    var TriangleY = cy - 30 * Math.cos(0);

    return `translate(${TriangleX}, ${TriangleY})`;
  }
  var tween = function (cx, cy) {
    return d3.interpolateString(
      `rotate(0, ${cx}, ${cy})`,
      `rotate(45, ${cx}, ${cy})`
    );
  };

  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");

    const nodo = svg
      .select(".chart")
      .selectAll("circle")
      .data(props.data.channel)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + i;
      })
      .style("fill", "orange")
      .attr("stroke-opacity", 0)
      .raise()
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

      .each(function (d, i) {
        if (d.valor == 1) {
          svg
            .select("#name" + i)
            .transition()
            .duration(700)
            .attr("stroke", "#008000")
            .attr("stroke-width", "14")
            .attr("stroke-opacity", 0.3)
            .attr("paint-order", "stroke");
        }
      })
      .attr("r", (d) => d.numeroInterv);

    const linea = svg
      .select(".chart")
      .selectAll("path.line")
      .data(props.data.trace_delta)
      .join("path")
      .attr("class", "line")
      .style("fill-opacity", 0)
      .attr("stroke", "black")
      .attr("d", function (d) {
        var dx =
            d3.select("#name" + d.target).attr("cx") -
            d3.select("#name" + d.source).attr("cx"),
          dy =
            d3.select("#name" + d.target).attr("cy") -
            d3.select("#name" + d.source).attr("cy"),
          dr = Math.sqrt(dx * dx + dy * dy);

        var offsetX = (dx * d3.select("#name" + d.target).attr("r")) / dr;
        var offsetY = (dy * d3.select("#name" + d.target).attr("r")) / dr;
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
          r = 12 + 20,
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
      .attr("stroke-width", (d) => d.weigth)
      .attr("marker-end", "url(#arrow)");
    

/*     const triangle = svg
        .select('.chart')
        .selectAll('path.triangle')
        .data(props.data.channel)
        .join('path')
        .attr('class', 'triangle')
        .attr("d", d3.symbol().type(d3.symbolTriangle))
        .attr("transform", function(d,i) { 
        // return `rotate(180, ${d3.select( '#name' + i ).attr('cx')}, ${d3.select( '#name' + i ).attr('cy')})` 
        //return `translate(${d3.select( '#name' + i ).attr('cx')  - ((30) * Math.sin(180))}, ${d3.select( '#name' + i).attr('cy') - ((30) * Math.cos(190))}) rotate(90)` 
            return triangleposition(d3.select( '#name' + i ).attr('cx') , d3.select( '#name' + i).attr('cy'))  
        })
        /*  .transition()
        .delay(100)
        .duration(100)
        .attrTween("transform", function(d,i) { 
          return d3.interpolateString(`rotate(0, 2.0665914735611585e-14, 67.5)`,`rotate(180, 2.0665914735611585e-14, 67.5)`);
          })
          
      
       
        .style("fill", "black"); 

    triangle.transition().delay(0).duration(500).attrTween("transform", function (d,i) { return tween(d3.select( '#name' + i ).attr('cx'), d3.select( '#name' + i ).attr('cy'))}); */

    //console.log(dimension)
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
        >
          <g
          className="arrow"
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
          </defs>
          </g>
        </g>
      </svg>
    </Box>
  );
};

export default NetworkGraph;
