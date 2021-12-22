import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


  const MultilineGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:270, height:270}
    const [data] = useState ([25,26,29,31,100,230])
      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('overflow','visible')
       .style('background-color','white') 

       const xScale = d3.scaleLinear()
       .domain([0,data.length - 1])
       .range([0,dimensions.width]);

       const yScale = d3.scaleLinear()
       .domain([0,dimensions.height])
       .range([dimensions.height,0]);


       const generateScaledLine = d3.line()
       .x((_,i) => xScale(i))
       .y(yScale)
       .curve(d3.curveCardinal);

       const xAxis = d3.axisBottom(xScale)
       .ticks(data.length)
       .tickFormat(i => i + 1 );

       const yAxis = d3.axisLeft(yScale)
       .ticks(5);

       svg.select(".xScale")
       .call(xAxis);

       svg.select(".yScale")
       .call(yAxis);


       const Lines = svg
       .selectAll("path.line")
       .data(props.data.channel[0].numeroInterv)
       .join("path")
       .attr('class', 'line')
       .attr('d', d=> generateScaledLine(d))
       .attr('fill', 'none')
       .attr('stroke','black');
       

    
      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="xScale" transform={`translate(0, ${dimensions.height})`}>
  </g> 
  <g className="yScale">
  </g>
      </svg>);
    };


export default MultilineGraph;