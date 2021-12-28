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

const datasets = [
    {
      name: "Brand 1",
      Affiliate: 10,
      Social: 20,
      Media: 30
    },
    {
      name: "Brand 2",
      Affiliate: 20,
      Social: 40,
      Media: 60
    },
    {
      name: "Brand 3",
      Affiliate: 30,
      Social: 45,
      Media: 80
    },
    {
      name: "Brand 4",
      Affiliate: 40,
      Social: 60,
      Media: 100
    },
    {
      name: "Brand 5",
      Affiliate: 50,
      Social: 80,
      Media: 120
    }
  ];
  
  const keys = ["Affiliate", "Social", "Media"];
  
  const colors = {
    Affiliate: "rgba(69, 0, 0, 0.8)",
    Social: "rgba(240, 72, 19, 0.8)",
    Media: "rgba(255, 199, 128, 0.8)"
  };

 const StackedBarChart = () => {
  const [data, setData] = useState(datasets);
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const xScale = scaleBand()
      .domain(data.map((d) => d.name))
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
      .attr("x", (sequence) => xScale(sequence.data.name))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

      
  }, [data, keys, colors]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: "270", height: "270px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "130%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};
export default StackedBarChart;