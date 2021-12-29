import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


  const MultilineGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:270, height:270}
    const [data] = useState ([25,26,2,21,10,23])
    const [interv,setInterv] = useState([]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    var margin = {top: 10, right: 30, bottom: 30, left: 60}
    
      useEffect(() => {
        setInterv([])
        props.data.channel.map((canales, i) => (
          canales.acumulateInterv.map((inte) =>
          setInterv(currentData => [...currentData,inte])
          )
          //setInterv(currentData => [...currentData,canales.acumulateInterv])
        ));
      
        var maxX = d3.max(interv, function(d,i) { return d;});
        var minN = d3.min(interv, function(d,i) { return d;});
        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width )
       .attr('height', dimensions.height)
       .style('overflow','visible')
       .style('background-color','white') 

       const xScale = d3.scaleLinear()
       .domain([0,data.length - 1])
       //.nice()
       .range([0,dimensions.width]);

       const yScale = d3.scaleLinear()
       //.domain([0,dimensions.height])
       //.range([dimensions.height,0]);
       .domain([minN ,maxX + 1])
       .range([dimensions.height,0])
       //.range([dimensions.height - margin.bottom, margin.top])
       .nice();


       const generateScaledLine = d3.line()
       .x((_,i) => xScale(i))
       .y(yScale);
       //.curve(d3.curveCardinal);

       const xAxis = d3.axisBottom(xScale)
       .ticks(data.length)
       .tickFormat(i => i + 1 );

       const yAxis = d3.axisLeft(yScale)
       .ticks(5);

       svg.select(".xScale")
       .call(xAxis);

       svg.select(".yScale")
       .call(yAxis);

       /* svg.append("clipPath")
       .attr("id", "clip")
       .append("rect")
       .attr("width", dimensions.width - 35.0)
       .attr("height", dimensions.height -30); */

       const group = svg
       .selectAll("g.lines")
       .data(props.data.channel)  
       .join("g")
       .attr("class", "lines")
       .attr("stroke", (d, i) => color(i))
       

       const Lines = group
       .selectAll("path.line")
       .data(function(d) {
        return  [d.acumulateInterv]
      })
      //.data([data])
       .join("path")
       .attr('class', 'line')
       .attr('d', d=> generateScaledLine(d))
       .attr('fill', 'none');
       
       //console.log(props.data.channel[0].acumulateInterv)
       //console.log(interv)
       console.log(maxX)
       console.log(minN)
       

    
      }, [props.data]);
    
      return (<svg ref={areaChart} > 
      <g className="xScale" transform={`translate(0, ${dimensions.height})`}>
  </g> 
  <rect className="clipPath"></rect>
  <g className="yScale" >
  </g>
  <g className="lines">
  </g>
      </svg>);
    };


export default MultilineGraph;