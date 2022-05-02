import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import happy from "../../Utilities/feliz.png";
import sad from "../../Utilities/sad.png";
import angry from "../../Utilities/angry.png";
import surprise from "../../Utilities/surprise.png";
import neutral from "../../Utilities/neutral.png";
import disgust from "../../Utilities/disgust.png";
import fear from "../../Utilities/fear.png";

/* var elements = [];
var dataset1 = [
  [0, "Expresion_angry"],
  [0, "Expresion_surprise"],
  [1, "Expresion_sad"],
  [1, "Expresion_sad"],
  [2, "Expresion_surprise"],
  [2, "Expresion_happy"],
  [3, "Expresion_happy"],
  [3, "Expresion_happy"],
  [5, "Expresion_happy"],
]; */
var elements2 = [];
const ExpresionLineGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 270, height: 270 };
  const expresions = [
    "Expresion_angry",
    "Expresion_disgust",
    "Expresion_fear",
    "Expresion_happy",
    "Expresion_neutral",
    "Expresion_sad",
    "Expresion_surprise",
  ];
  const [tick, setTick] = useState([1]);
  //const [tick, setTick] = useState([0]);

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
      .domain(d3.extent(tick))

      .range([0, dimensions.width]);

    var yScale = d3
      .scalePoint()
      .range([dimensions.height, 0])
      .domain(
        expresions.map(function (d) {
          return d;
        })
      );
    /*  var yScale = d3
      .scaleBand()
      .range([dimensions.height, 0])
      .domain(
        expresions.map(function (d) {
          return d;
        })
      ); */

    //.nice();
    //.range([dimensions.height,0]);
    //.domain([minN ,maxX])
    //.range([dimensions.height - margin.bottom, margin.top])

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
    /* svg.append("clipPath")
       .attr("id", "clip")
       .append("rect")
       .attr("width", dimensions.width - 35.0)
       .attr("height", dimensions.height -30); */

    /*  const group = svg
      .selectAll("g.lines")
      // .data(props.data.channel)
      //.data(interv6)
      .data(elements)
      .join("g")
      .attr("class", "lines")
      .attr("stroke", (d, i) => color[order[i]]); */

    const circles = svg
      .selectAll("g.yScale")
      //.select("circle")
      .selectAll("circle")
      .data(expresions)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + i;
      })
      .attr("r", 10)
      //.attr("fill", "rgba(100, 0, 0, 0.2)")
      .style("fill", function (d) {
        switch (d) {
          case "Expresion_angry":
            return "#F30606";
            break;
          case "Expresion_disgust":
            return "#4ECE2B";
            break;
          case "Expresion_fear":
            return "#A657A8";
            break;
          case "Expresion_surprise":
            return "#E68714";
            break;
          case "Expresion_sad":
            return "#33AAFF";
            break;
          case "Expresion_happy":
            return "#FFCE36";
            break;
          case "Expresion_neutral":
            return "#737273";
            break;
        }
      })
      .attr("transform", (d) => `translate(${-20},${scale(d)} )`);

    const circles2 = svg
      .selectAll("g.yScale")
      //.select("circle")
      .selectAll("circle2")
      .data(expresions)
      .join("circle")
      .attr("id", function (_, i) {
        return "name2" + i;
      })
      .attr("r", 10)
      //.attr("fill", "rgba(100, 0, 0, 0.2)")
      .attr("fill", function (d) {
        switch (d) {
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
      .attr("transform", (d) => `translate(${-20},${scale(d)} )`);

    /*  const Lines = group
      .selectAll("path.line")
      .data(function (d) {
        return [d];
      })
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none"); */

    /* const lineas = group
      .selectAll("myline")
      .data(function (d) {
        return [d];
      })
      .join("line")
      .attr("x1", function (d, i) {
        return xScale(i);
      })
      .attr("x2", function (d, i) {
        return xScale(i);
      })
      .attr("y1", function (d) {
        return yScale(d);
      })
      .attr("y2", function (d) {
        return yScale(d);
      })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px"); */

    /*   const group3 = svg
      .selectAll("g.circles")
      // .data(props.data.channel)
      //.data(interv6)
      .data(elements)
      .join("g")
      .attr("class", "circles")
      .attr("stroke", (d, i) => color[order[i]]); */

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
        //return xScale(tick.length - 1);
        return xScale(d[1]);
        //return xScale(d.length - 1);
        //return xScale(d[d.length - 1][1]);
        //return xScale(d.length - 2);
        //return console.log(tick.length);
        // return console.log(d[d.length - 1]), console.log(d);
      })
      .attr("cy", function (d, i) {
        return yScale(d[0]);
        //return console.log(d);
        // return yScale(d[d.length - 1][0]);
        //return console.log(d);
        //return yScale(d[1]);
      })
      //.attr("transform", (d) => "translate(" + xScale(d[0]) + "," + yScale(d[1])+ ")")

      .attr("r", "3")
      .style("fill", "#69b3a2");

    //console.log(props.data.channel[0].acumulateInterv)
    //console.log(interv)
    // console.log(maxX)
    // console.log(minN)
    //console.log(interv6)
    console.log(elements2);
    console.log(tick);
    //console.log(limits);
    //console.log(props.tiempo);
  }, [props.data]);

  return (
    <svg ref={areaChart}>
      <defs>
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
