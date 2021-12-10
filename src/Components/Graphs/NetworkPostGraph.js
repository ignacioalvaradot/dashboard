import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Box from '@mui/material/Box';

  const NetworkPostGraph = props => {
    const areaChart = useRef(null);
    const dimensions = {width:270, height:270}
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    var mycolors = ["#FFA500","#008000"]

      useEffect(() => {
        const pie = (data)=> d3.pie().value(d => d.value)(data);
        const arc =(radio) => d3.arc()
         .innerRadius(0)
         .outerRadius(radio)

    const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white')

       var g = svg .select('.chart')
       .selectAll("g.arc")
       .data(props.data.channel)  
       .join("g")
       .attr("class", "arc")
       .raise() 
       .attr("transform",function(_,i) { 
       
      return `translate(${(dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75))}, ${(dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) })`});
        
        const nodo = 
        g.selectAll("path.pie")
        .data(function(d) {
          return pie(d.acumulate_posture)
        }) 

        .join("path")
        .attr('class', 'pie')
        .attr("fill", function (d, i) {
          return mycolors[i];
      })
        .attr("d", arc(25));

      

        const linea =  svg
        .select('.chart')
        .selectAll('path.line')
        .data(props.data.trace_delta)
        .join('path')
        .attr('class', 'line')
        .style("fill-opacity",0)
        //.attr('stroke','black')
        .attr("d", function(d) {
          var dx = (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.target/ props.data.channel.length)+ 0.75)) - (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.source/ props.data.channel.length)+ 0.75)),
              dy = (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.target/ props.data.channel.length) + 0.75)) - (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.source/ props.data.channel.length) + 0.75)),
              dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.source/ props.data.channel.length)+ 0.75)) + "," + (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.source/ props.data.channel.length) + 0.75)) + "A" + dr + "," + dr + " 0 0,1 " + (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.target/ props.data.channel.length)+ 0.75)) + "," + (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.target/ props.data.channel.length) + 0.75))
          })
          .attr("d", function(d) {

            // length of current path
            var pl = this.getTotalLength(),
              // radius of circle plus backoff
              r = (20),
              // position close to where path intercepts circle
              m = this.getPointAtLength(pl - r);
        
            var dx = m.x - (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.source/ props.data.channel.length)+ 0.75)),
              dy = m.y - (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.source/ props.data.channel.length) + 0.75)),
              dr = Math.sqrt(dx * dx + dy * dy);
        
            return "M" + (dimensions.width/4)*Math.cos(2 * Math.PI * ((d.source/ props.data.channel.length)+ 0.75)) + "," + (dimensions.height/4)*Math.sin(2 * Math.PI * ((d.source/ props.data.channel.length) + 0.75)) + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
          })
          .attr("stroke", function (d) {

            switch (d.type) {
                case "open":
                  return ("#FFA500")
                  break;
                case "close":
                  return ("#008000")
                  break;
                
            }
    
           }) 
        .attr("stroke-width", 8);
            
          }, [props.data]);
    
      return (
        <Box   sx= {{border: "2px solid red", width: dimensions.width, height:dimensions.height }} >
      <svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
  </g> 
      </svg>
      </Box>
      );
    };


export default NetworkPostGraph;