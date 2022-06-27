import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = (props) => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const mycolors = ["#FFA500", "#008000"];

  useEffect(() => {
    const data = createPie(props.data.group.acumulate_posture);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => mycolors[i]);

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(
        (d) =>
          Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100) + "%"
      );
    /*     const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", d => `translate(${createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text(d => format(toString(d.valor))); */
    // eslint-disable-next-line
  }, [props.data]);

  return (
    <svg
      style={{ borderRadius: "10px" }}
      width={props.width}
      height={props.height}
    >
      <g
        ref={ref}
        transform={`translate(${props.width / 2},${props.height / 2})`}
      />
    </svg>
  );
};

export default Pie;
