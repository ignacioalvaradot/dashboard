import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

var elements = [];
const MultilineGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 260, height: 260 };
  /*   const [interv, setInterv] = useState([]);
  const [interv2, setInterv2] = useState([]);
  const [interv3, setInterv3] = useState([]);
  const [interv4, setInterv4] = useState([]);
  const [interv5, setInterv5] = useState([]);
  const [interv6, setInterv6] = useState([]); */
  const [tick, setTick] = useState([0]);

  //const color = d3.scaleOrdinal(d3.schemeCategory10);
  //const color = d3.scaleOrdinal(["#2499EF", "#FF9777", "#FF6B93", "#6BD098"]);
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
    props.data.channel.map((data, i) => (elements[i] = []));
  }, []);

  useEffect(() => {
    /* setInterv([]);
    setInterv6([]); */
    const order = [];
    var limits = [];

    /* props.data.channel.map((canales, i) =>
      canales.acumulateInterv.map((inte) =>
        setInterv((currentData) => [...currentData, inte])
      )
      //setInterv(currentData => [...currentData,canales.acumulateInterv])
    ); */

    props.data.channel.map(
      (canales, i) => (
        //elements[i] = [canales.numeroInterv]
        elements[i].push(canales.numeroInterv),
        (order[i] = canales.channelId - 1)
      )
    );

    props.data.channel.map((canales, i) => (limits[i] = canales.numeroInterv));

    /* props.data.channel.map((canales, i) => (
        setInterv2(currentData => [...currentData,canales.numeroInterv])
          //setInterv(currentData => [...currentData,canales.acumulateInterv])
        )); */

    /* setInterv2((currentData) => [
      ...currentData,
      props.data.channel[0].numeroInterv,
    ]);
    setInterv3((currentData) => [
      ...currentData,
      props.data.channel[1].numeroInterv,
    ]);
    setInterv4((currentData) => [
      ...currentData,
      props.data.channel[2].numeroInterv,
    ]);
    setInterv5((currentData) => [
      ...currentData,
      props.data.channel[3].numeroInterv,
    ]);

    setInterv6((currentData) => [
      ...currentData,
      interv2,
      interv3,
      interv4,
      interv5,
    ]); */

    // var maxX = d3.max(interv, function(d,i) { return d;});
    //var minN = d3.min(interv, function(d,i) { return d;});
    var maxX = d3.max(limits, function (d, i) {
      return d;
    });
    var minN = d3.min(limits, function (d, i) {
      return d;
    });
    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("overflow", "visible")
      .style("background-color", "white");

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(tick))
      //.domain([0, props.tiempo])
      //.domain([0, 1000])
      //.nice()
      .range([0, dimensions.width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .range([dimensions.height, 0])
      //.domain(d3.extent(interv));
      //.domain(d3.extent(limits));
      .domain([0, maxX + 1]);
    //.nice();
    //.range([dimensions.height,0]);
    //.domain([minN ,maxX])
    //.range([dimensions.height - margin.bottom, margin.top])

    const generateScaledLine = d3
      .line()
      .x((_, i) => xScale(i))
      .y(yScale);
    //.curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale).ticks(5);
    // .tickFormat(i => i + 1 );

    const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain());
    //.ticks(5);
    //.tickFormat(i => i + 1 );

    svg.select(".xScale").call(xAxis);

    svg.select(".yScale").call(yAxis);

    /* svg.append("clipPath")
       .attr("id", "clip")
       .append("rect")
       .attr("width", dimensions.width - 35.0)
       .attr("height", dimensions.height -30); */

    const group = svg
      .selectAll("g.lines")
      // .data(props.data.channel)
      //.data(interv6)
      .data(elements)
      .join("g")
      .attr("class", "lines")
      .attr("stroke", (d, i) => color[order[i]]);

    const Lines = group
      .selectAll("path.line")
      /* .data(function(d) {
        return  [d.acumulateInterv]
      }) */
      .data(function (d) {
        return [d];
      })
      //.data([interv6])
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => generateScaledLine(d))
      /*  .attr("d", function(d){
        return d3.line()
          .x(function(d) { return xScale(d); })
          .y(function(d) { return yScale(+d); })
          
      }) */
      .attr("fill", "none");

    //console.log(props.data.channel[0].acumulateInterv)
    //console.log(interv)
    // console.log(maxX)
    // console.log(minN)
    //console.log(interv6)
    //console.log(elements);
    //console.log(limits);
    //console.log(props.tiempo);
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
    </svg>
  );
};

export default MultilineGraph;
