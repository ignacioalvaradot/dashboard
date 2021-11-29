import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


  const NetworkGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:300, height:300}

      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white') 
//const arrow = svg.append("svg:defs").append("svg:marker").attr("id", "arrow").attr("viewBox", "0 0 10 10").attr("refX", 0).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto").append("svg:path").attr("d", "M 0 0 L 10 5 L 0 10 z");


       // var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    /*     var g = svg.append("g").join(
          (enter) =>
          enter
          .selectAll("circle")
          .data(props.data.channel)
          .join("circle")
          .attr("id", function(d,i){return 'name' + i}  )
          //.attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")")        
          .attr('cx', function(d,i) { 
              return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
          .attr('cy', function(d,i) {     
                  return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
          .attr("r", d => d.numeroInterv), */

        
          //testing links


      

        /* const my_group = svg.selectAll('.chart_group')
        .join(function(group){
           var enter = group.append("g").attr("transform", "translate(" + dimensions.width / 2 + "," + dimensions.height / 2 + ")");
           return enter;
        });
 */


  /*      const cara = svg
        .data(props.data.channel)
        .join("svg:image")
        .attr('x', -9)
        .attr('y', -12)
        .attr('width', 20)
        .attr('height', 24) */
        
    /*     const arrow = 
        svg.join( 'line:defs' ).join( 'line:marker' )
        .attr( 'id', 'triangle' )
        .attr( 'refX', 6 )
        .attr( 'refY', 6 )
        .attr( 'markerWidth', 30 )
        .attr( 'markerHeight', 30 )
        .attr( 'markerUnits', 'userSpaceOnUse' )
        .attr( 'orient', 'auto' )
        .join( 'path' )
        .attr( 'd', 'M 0 0 12 6 0 12 3 6' )
        .style( 'fill', 'black' ); */

        const nodo = 
        svg
        .select('.chart')
        .selectAll("circle")
        .data(props.data.channel)
        .join("circle")
        .attr("id", function(d,i){return 'name' + i}  )
       // .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")")
       .attr("fill", "orange")    
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .attr("r", d => d.numeroInterv);


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
     
        console.log(props.data.trace_delta)
    
      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
      <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="3" markerHeight="3"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
    </defs>
  </g> 
      </svg>);
    };


export default NetworkGraph;