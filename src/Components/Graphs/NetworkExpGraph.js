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

  const NetworkExpGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:270, height:270}

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
        .style("fill", function (d) {

        switch (d.valor) {
            case "Expresion_angry":
              return ("#F30606")
              break;
            case "Expresion_disgust":
              return ("#4ECE2B")
              break;
            case "Expresion_fear":
              return ("#A657A8")
              break;
            case "Expresion_surprise":
              return ("#E68714")
              break;
            case "Expresion_sad":
               return ("#33AAFF")
              break;
            case "Expresion_happy":
                return ("#FFCE36")
               break;
            case "Expresion_neutral":
              return ("#FFFFFF")
               break;

        }

       })   
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .raise() 
        .attr("r", 25);

        const nodosImagenes = 
        svg
        .select('.chart')
        .selectAll("circle2")
        .data(props.data.channel)
        .join("circle")
        .attr("id", function(_,i){return 'name2' + i}  ) 
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
        .attr("r", 25);

        const linea =  svg
        .select('.chart')
        .selectAll('path.line')
        .data(props.data.trace_delta)
        .join('path')
        .attr('class', 'line')
        .style("fill-opacity",0)
        .attr("d", function(d) {
          var dx = d3.select( '#name' + d.target ).attr('cx')  - d3.select( '#name' + d.source ).attr('cx'),
              dy = d3.select( '#name' + d.target ).attr('cy') - d3.select( '#name' + d.source ).attr('cy'),
              dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy') + "A" + dr + "," + dr + " 0 0,1 " + d3.select( '#name' + d.target ).attr('cx') + "," + d3.select( '#name' + d.target ).attr('cy')
          })
          .attr("d", function(d) {
            var pl = this.getTotalLength(),
              r = (20),
              m = this.getPointAtLength(pl - r);
        
            var dx = m.x - d3.select( '#name' + d.source ).attr('cx'),
              dy = m.y - d3.select( '#name' + d.source ).attr('cy'),
              dr = Math.sqrt(dx * dx + dy * dy);
        
            return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy') + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
          })
          .attr("stroke", function (d) {

            switch (d.expresion) {
                case "Expresion_angry":
                  return ("#F30606")
                  break;
                case "Expresion_disgust":
                  return ("#4ECE2B")
                  break;
                case "Expresion_fear":
                  return ("#A657A8")
                  break;
                case "Expresion_surprise":
                  return ("#E68714")
                  break;
                case "Expresion_sad":
                   return ("#33AAFF")
                  break;
                case "Expresion_happy":
                    return ("#FFCE36")
                   break;
                case "Expresion_neutral":
                  return ("#FFFFFF")
                   break;
            }
    
           }) 
        .attr("stroke-width", d => d.weigth);    
      }, [props.data]);
    
      return (
        <Box   sx= {{border: "2px solid red",borderRadius: "10px",width: dimensions.width, height:dimensions.height }} >
      <svg style={{borderRadius: "10px"}} ref={areaChart}> 
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


export default NetworkExpGraph;