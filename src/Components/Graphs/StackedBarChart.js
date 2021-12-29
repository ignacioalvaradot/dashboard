import React, { useState, useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max
} from "d3";


  
  const keys = ["totalTimeEfectv", "totalTimeSilenc"];
  
  const colors = {
    totalTimeEfectv: "#008000",
    totalTimeSilenc: "#25DBFD"
  };

 const StackedBarChart = props  => {
  const [timeInt, setTimeInt] = useState([]);
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {

    setTimeInt([])
        props.data.channel.map((canales, i) => (
          setTimeInt(currentData => [...currentData,{"totalTimeEfectv":canales.totalTimeEfectv, "totalTimeSilenc":canales.totalTimeSilenc}])
        ));
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(timeInt);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    const yScale = scaleLinear().domain([0,100]).range([height, 0]);

    const xScale = scaleBand()
      //.domain(data.map((d) => d.name))
      .domain(timeInt.map((d,i) => "S"+ i ))
      .range([0, width])
      .padding(0.46);

    const xAix = axisBottom(xScale);
    const yAix = axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height}) `)
      .call(xAix);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${20}, 0 )`)
      .call(yAix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      //.attr("x", (sequence,i) => xScale(sequence.data.name))
      .attr("x", (sequence,i) => xScale("S"+i))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

      console.log(timeInt)
  }, [props.data]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: "270", height: "270px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};
export default StackedBarChart;