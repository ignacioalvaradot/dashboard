import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import feliz from "../../Utilities/feliz.png";
import feliz2 from "../../Utilities/feliz2.svg";


  const NetworkExpGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:300, height:300}

      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white') 

        const nodo = 
        svg
        .select('.chart')
        .selectAll("circle")
        .data(props.data.channel)
        .join("circle")
        .attr("id", function(_,i){return 'name' + i}  ) 
        .attr("fill", "url(#image)")
        
        
        .style("fill", function (d) {

        switch (d.valor) {
            case "Expresion_angry":
              return ("#F30606")
              break;
            case "Expresion_sad":
               return ("#33AAFF")
              break;
            case "Expresion_happy":
                return ("#FFCE36")
               break;

        }

       })  
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .attr("r", 20);


/* nodo.append("image")
.attr("xlink:href", "https://github.com/favicon.ico")
.attr("x", 20/2)
.attr("y", 20/2)
.attr("width", 4)
.attr("height", 4); */

/* 
        svg
        .select('.chart')
        .selectAll("line")
        .data(props.data.trace_delta)
        .join("line")
        //.attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")") 
        .attr("x1", function(d,i) { return d3.select( '#name' + d.source ).attr('cx') })
        .attr("y1", function(d) { return d3.select( '#name' + d.source ).attr('cy') })
        .attr("x2", function(d) { return d3.select( '#name' + d.target ).attr('cx') })
        .attr("y2", function(d) { return d3.select( '#name' + d.target ).attr('cy') }) 
        .attr("stroke-width", d => d.weigth)
        .attr("marker-end", "url(#arrow)")
        .attr("stroke","black");  
      */
        //console.log(props.data.channel)
    
      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
      <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="3" markerHeight="3"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
    <pattern id='image' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
      <image xlinkHref={feliz2} width="100" height="100" preserveAspectRatio="none" ></image>
    </pattern>
    </defs>
  </g> 
      </svg>);
    };


export default NetworkExpGraph;