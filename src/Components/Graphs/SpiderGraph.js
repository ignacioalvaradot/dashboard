import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import happy from "../../Utilities/feliz.png";
import sad from "../../Utilities/sad.png";
import angry from "../../Utilities/angry.png";
import surprise from "../../Utilities/surprise.png";
import neutral from "../../Utilities/neutral.png";
import disgust from "../../Utilities/disgust.png";
import fear from "../../Utilities/fear.png";

const expresions = [
  "Expresion_angry",
  "Expresion_disgust",
  "Expresion_fear",
  "Expresion_happy",
  "Expresion_neutral",
  "Expresion_sad",
  "Expresion_surprise",
];

const SpiderGraph = (props) => {
  const areaChart = useRef();
  const dimensions = { width: 290, height: 295 };

  function angleToCoordinate(angle, value) {
    let radialScales = d3.scaleLinear().domain([0, 10]).range([0, 130]);
    let x = Math.cos(angle) * radialScales(value);
    let y = Math.sin(angle) * radialScales(value);
    return { x: x, y: -y };
  }

  function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < expresions.length; i++) {
      let ft_name = expresions[i];
      let angle = Math.PI / 2 + (2 * Math.PI * i) / expresions.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  }
  //const color = d3.scaleOrdinal(d3.schemeCategory10);
  const color = [
    "#2499EF",
    "#FF9777",
    "#FF6B93",
    "#6BD098",
    "#865109",
    "#957DAD",
  ];
  useEffect(() => {
    const svg = d3
      .select(areaChart.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background-color", "white");

    let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
    let ticks = [2, 4, 6, 8, 10];
    // eslint-disable-next-line
    const circles = svg
      .select(".chart")
      .selectAll("circle")
      .data(ticks)
      .join("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", function (d, i) {
        return radialScale(i + 1);
      });
    // eslint-disable-next-line
    const text = svg
      .select(".chart")
      .selectAll("text")
      .data(ticks)
      .join("text")
      .attr("id", function (_, i) {
        return "scalesid" + i;
      })
      .attr("x", 10)
      .attr("y", function (d, i) {
        return -radialScale(i + 1);
      })
      .text((d) => d.toString());
    // eslint-disable-next-line
    const lines = svg
      .select(".chart")
      .selectAll("line")
      .data(expresions)
      .join("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (_, i) {
        return +(
          Math.cos(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5)
        );
      })
      .attr("y2", function (_, i) {
        return -(
          Math.sin(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5)
        );
      })
      .attr("stroke", "black");

    /*  const line_label = svg
      .select(".chart")
      .selectAll("text2")
      .data(expresions)
      .join("text")
      .attr("id", function (_, i) {
        return "labelid" + i;
      })
      .attr("x", function (_, i) {
        return +(
          Math.cos(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })
      .attr("y", function (_, i) {
        return -(
          Math.sin(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })
      .text((d) => d); */
    // eslint-disable-next-line
    const nodo = svg
      .select(".chart")
      .selectAll("circle3")
      .data(expresions)
      .join("circle")
      .attr("id", function (d, i) {
        return "name" + i;
      })
      .style("fill", function (d) {
        // eslint-disable-next-line
        switch (d) {
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
      .attr("cx", function (_, i) {
        return +(
          Math.cos(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })
      .attr("cy", function (_, i) {
        return -(
          Math.sin(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })

      .attr("r", 10);
    // eslint-disable-next-line
    const nodosImagenes = svg
      .select(".chart")
      .selectAll("circle2")
      .data(expresions)
      .join("circle")
      .attr("id", function (_, i) {
        return "name2" + i;
      })
      .attr("fill", function (d) {
        // eslint-disable-next-line
        switch (d) {
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
      .attr("cx", function (_, i) {
        return +(
          Math.cos(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })
      .attr("cy", function (_, i) {
        return -(
          Math.sin(Math.PI / 2 + (2 * Math.PI * i) / expresions.length) *
          radialScale(5.5)
        );
      })
      .raise()
      .attr("r", 10);

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    const group = svg
      .select(".chart")
      .selectAll("g.area")
      .data(props.data.channel)
      .join("g")
      .attr("class", "area")
      .attr("stroke", (d, i) => color[i])
      .attr("fill", (d, i) => color[i]);
    // eslint-disable-next-line
    const area = group
      .selectAll("path.area")
      .data(function (d) {
        return [getPathCoordinates(d.acumulate_expresion)];
      })
      .join("path")
      .attr("class", "area")
      .attr("d", line)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);

    //console.log(props.data.channel[0].acumulate_expresion);
    // eslint-disable-next-line
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
        className="chart"
        transform={`translate(${dimensions.width / 2} ${
          dimensions.height / 2
        })`}
      ></g>
    </svg>
  );
};

export default SpiderGraph;
