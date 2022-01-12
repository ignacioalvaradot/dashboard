import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import resize from "./useResizeObserver";

const NetworkGraph = (props) => {
  //const [radiusScale, setRadiusScale] = useState([])
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };
  //const dimensions= resize(areaChart);


 /*  useEffect(() => {
    var max = radiusScale;
    setRadiusScale([])
    props.data.channel.map((canales, i) => (
      setRadiusScale(currentData => [...currentData,canales.numeroInterv])
      ));

      var maxRadius= d3.max(radiusScale, function(d) { return d;});
      console.log(radiusScale)
  }, [props.data]);  */
 
  useEffect(() => {
    
    /* setRadiusScale([])
    props.data.channel.map((canales, i) => (
        setRadiusScale(currentData => [...currentData,canales.numeroInterv])
        )); */
var radio = [];
var strokeWidth = [];
    props.data.channel.map((canales, i) => (
      radio[i] = canales.numeroInterv
      ));
      props.data.trace_delta.map((canales, i) => (
        strokeWidth[i] = canales.weigth
        ));

      
  var maxRadius= d3.max(radio, function(d) { return d;});
  var maxWidth= d3.max(strokeWidth, function(d) { return d;}); 

    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");


     const nodoScale = d3.scaleLinear()
    .domain([0 ,maxRadius])
    .range([8,25]); 

    const lineaScale = d3.scaleLinear()
    .domain([0 ,maxWidth])
    .range([4,8]); 

    const nodoTransparency = d3.scaleLinear()
    .domain([0 ,maxRadius])
    //.range([0.50,0.90]);
    .range([0,0.50]); 

    const nodo = svg
      .select(".chart")
      .selectAll("circle")
      .data(props.data.channel)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + i;
      })
      //.style("fill", "orange")
      .attr("fill", d => d3.color("orange").brighter(nodoTransparency( d.numeroInterv)))
      //.attr("fill-opacity", d => nodoTransparency( d.numeroInterv))
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
      .attr("r",function(d){
        return nodoScale( d.numeroInterv);
      });
      //.attr("r", (d) => d.numeroInterv);

    const linea = svg
      .select(".chart")
      .selectAll("path.line")
      .data(props.data.trace_delta)
      .join("path")
      .attr("class", "line")
      .style("fill-opacity", 0)
      .attr("stroke", "#bcbfc4")
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
          r = 12 + 30,
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
      //.attr("stroke-width", (d) => d.weigth)
      .attr("stroke-width",function(d,i){
        return lineaScale( d.weigth);
      })
      .attr("marker-end", "url(#arrow)");

      const texto = svg
      .select(".chart")
      .selectAll("text")
      .data(props.data.channel)
      .join("text")
      .style("text-anchor", "middle")
      .raise()
      .attr("transform", function(d,i) { 
        return `translate(${d3.select( '#name' + i ).attr('cx')  }, ${d3.select( '#name' + i).attr('cy') - (37) })` 
           
        })
      .text(function (d,i) {
           return `sujeto ${i + 1} `;
      });
    
    //console.log(dimension)
   //console.log("estado de seteo:" + radiusScale)
   //console.log("variable de seteo:" + radio)
    //console.log(maxRadius)
    //console.log(props.data.channel[0].numeroInterv)
    //console.log(nodoScale(props.data.channel[0].numeroInterv))
    //console.log(lineaScale(props.data.trace_delta[0].weigth))
    
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
              fill ="#bcbfc4"
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
