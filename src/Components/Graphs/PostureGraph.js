import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

  const NetworkGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:300, height:300}

   /*  const pie = d3.layout.pie()
    .value(function (d) { return +d.pcArray; })
    .sort(null); */

      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white')

       var g = svg .select('.chart')
       .selectAll("g")
       .data(props.data.channel)
       .join("g")
        
        const nodo = 
        g
        .join("circles")
        .attr("id", function(d,i){return 'name' + i}  )
       .style("fill", "orange")
      .attr("stroke-opacity", 0) 
       .raise()   
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75))} )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } ) 

        .attr("r", "20");

    
     
        console.log(props.data.trace_delta)
        
    
      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
  </g> 
      </svg>);
    };


export default NetworkGraph;