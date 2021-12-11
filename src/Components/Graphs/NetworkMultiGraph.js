import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import happy from "../../Utilities/feliz.png";
import sad from "../../Utilities/sad.png";
import angry from "../../Utilities/angry.png";
import surprise from "../../Utilities/surprise.png";
import neutral from "../../Utilities/neutral.png";
import disgust from "../../Utilities/disgust.png";
import fear from "../../Utilities/fear.png";
import Box from '@mui/material/Box';

  const NetworkGraph = props => {
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
  
      
        

        const nodosImagenes = 
        svg
        .select('.chart')
        .selectAll("circle")
        .data(props.data.channel)
        .join("circle")
        .attr("id", function(_,i){return 'name' + i}  ) 
        .attr("stroke-opacity", 0) 
        .attr("fill", function (d) {
 
          switch (d.valor) {
              case "Expresion_angry":
                return ("url(#angry)")
                break;
              case "Expresion_disgust":
                return ("url(#disgust)")
                break;
              case "Expresion_fear":
                return ("url(#fear)")
                break;
              case "Expresion_surprise":
                return ("url(#surprise)")
                break;
              case "Expresion_sad":
                 return ("url(#sad)")
                break;
              case "Expresion_happy":
                  return ("url(#happy)")
                 break;
              case "Expresion_neutral":
                return ("url(#neutral)")
                 break;
  
          }
        })
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .raise()
        .each(function(d,i){
         if (d.talk == 1){
         svg.select( '#name' + i ).transition().duration(700).attr("stroke", "#008000").attr("stroke-width","14").attr("stroke-opacity", 0.3).attr("paint-order","stroke")
         }
     })
        .attr("r", 25);

        const linea =  svg
        .select('.chart')
        .selectAll('path.line')
        .data(props.data.trace_delta)
        .join('path')
        .attr('class', 'line')
        .style("fill-opacity",0)
        .attr('stroke','black')
         .attr("d", function(d) {
          var dx = d3.select( '#name' + d.target ).attr('cx')  - d3.select( '#name' + d.source ).attr('cx'),
              dy = d3.select( '#name' + d.target ).attr('cy') - d3.select( '#name' + d.source ).attr('cy'),
              dr = Math.sqrt(dx * dx + dy * dy);
 
          return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy') + "A" + dr + "," + dr + " 0 0,1 " + d3.select( '#name' + d.target ).attr('cx') + "," + d3.select( '#name' + d.target ).attr('cy')
          })
          .attr("d", function(d) {
 
            // length of current path
            var pl = this.getTotalLength(),
              // radius of circle plus backoff
              r = (12) + 25,
              // position close to where path intercepts circle
              m = this.getPointAtLength(pl - r);
        
            var dx = m.x - d3.select( '#name' + d.source ).attr('cx'),
              dy = m.y - d3.select( '#name' + d.source ).attr('cy'),
              dr = Math.sqrt(dx * dx + dy * dy);
        
            return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy') + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
          }) 
        //.attr("d", function(d) { return drawBend(d3.select( '#name' + d.source).attr('cx'), d3.select( '#name' + d.source ).attr('cy'), d3.select( '#name' + d.target ).attr('cx') , d3.select( '#name' + d.target).attr('cy') , bend, aLen, aWidth, sArrow, eArrow, startRadius, endRadius)})
        .attr("stroke-width", d => d.weigth)
        .attr("marker-end", "url(#arrow)");

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
            
          }, [props.data]);
    
      return (
      <Box  sx= {{border: "2px solid red",borderRadius: "10px", width: dimensions.width, height:dimensions.height }} >
      <svg ref={areaChart} style={{borderRadius: "10px"}}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
      <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="3" markerHeight="3"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
    <pattern id='happy' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={happy} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='sad' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={sad} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='angry' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={angry} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='surprise' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={surprise} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='neutral' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={neutral} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='disgust' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={disgust} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>

    <pattern id='fear' width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
    <image xlinkHref={fear} width="100" height="100" preserveAspectRatio="none" ></image> 
    </pattern>
    </defs>
  </g> 
      </svg>
      </Box>
      );
    };


export default NetworkGraph;