import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

var elements2 = [];
const ExpresionLineGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };

  //const [tick, setTick] = useState([1]);
  const [tick, setTick] = useState([0]);

  const color = ["#2499EF", "#FF9777", "#FF6B93", "#6BD098"];
  var margin = { top: 10, right: 30, bottom: 30, left: 60 };

  const ticks = () => {
    setTick((currentData) => [...currentData, tick.slice(-1)[0] + 1]);
  };

  useEffect(() => {
    const interval = setInterval(ticks, 1000);
    //console.log(tick)

    return () => {
      clearInterval(interval);
    };
  }, [tick]);

  useEffect(() => {
    elements2 = [];
  }, []);

  /*   useEffect(() => {
    props.data.channel.map((data, i) => (elements[i] = []));
  }, []);
 */
  useEffect(() => {
    const order = [];
    var limits = [];

    props.data.channel.map(
      (canales, i) =>
        //elements[i] = [canales.numeroInterv]
        //elements[i].push(canales.valor), (order[i] = canales.channelId - 1)
        /* elements[i].push([canales.valor, tick.length]),
        (order[i] = canales.channelId - 1), */
        elements2.push([canales.valor, tick.length])
      //elements2.push([canales.valor, elements2.length])
    );

    props.data.channel.map((canales, i) => (limits[i] = canales.numeroInterv));

    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("overflow", "visible")
      .style("background-color", "white");

    const xScale = d3
      //.scaleTime()
      .scaleLinear()
      //.domain(d3.extent(tick))
      .domain([0, tick.length])
      .range([0, dimensions.width]);

    var yScale = d3
      .scalePoint()
      .range([dimensions.height, 0])
      .domain(
        expresions.map(function (d) {
          return d;
        })
      );

    const generateScaledLine = d3
      .line()
      .x((_, i) => xScale(i))
      //.y(yScale);
      .y(function (d) {
        return yScale(d);
      });

    //.curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale).ticks(5);
    // .tickFormat(i => i + 1 );

    //const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain());
    const yAxis = d3.axisLeft(yScale).tickFormat("");
    //.ticks(5);
    //.tickFormat(i => i + 1 );

    svg.select(".xScale").call(xAxis);

    svg.select(".yScale").call(yAxis);
    const scale = yAxis.scale();

    const circulo = svg
      .select(".dot")
      .selectAll("circle")

      /* .data(function (d) {
        return [d];
      }) */
      //.data(elements)
      .data(elements2)
      //.data(dataset1)
      .join("circle")
      .attr("id", function (d, i) {
        //return "name" + i;
        return "name" + i;
      })
      .attr("cx", function (d, i) {
        return xScale(d[1]);
      })
      .attr("cy", function (d, i) {
        return yScale(d[0]);
      })

      .attr("r", "3")
      .style("fill", "#69b3a2");

    console.log(elements2);
    console.log(tick);
  }, [props.data]);

  return (
    <svg ref={areaChart}>
      <g
        className="xScale"
        transform={`translate(0, ${dimensions.height})`}
      ></g>
      <rect className="clipPath"></rect>
      <g className="yScale"></g>
      <g className="lines"></g>
      <g className="dot"></g>
    </svg>
  );
};

export default ExpresionLineGraph;
