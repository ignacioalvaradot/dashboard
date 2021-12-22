import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const expresions = ["Expresion_angry", "Expresion_disgust","Expresion_fear","Expresion_happy","Expresion_neutral","Expresion_sad","Expresion_surprise"];

  const SpiderGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:270, height:270}

    function angleToCoordinate(angle, value){
      let radialScales = d3.scaleLinear()
      .domain([0,10])
      .range([0,130]);
      let x = Math.cos(angle) * radialScales(value);
      let y = Math.sin(angle) * radialScales(value);
      return {"x":  x, "y": - y};
  } 

  function getPathCoordinates(data_point){
    let coordinates = [];
    for (var i = 0; i < expresions.length; i++){
        let ft_name = expresions[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / expresions.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}
const color = d3.scaleOrdinal(d3.schemeCategory10);
      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white') 

       let radialScale = d3.scaleLinear()
       .domain([0,10])
       .range([0,250]);
   let ticks = [2,4,6,8,10];

const circles = svg.select(".chart")
.selectAll("circle")
.data(ticks)
.join("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("fill", "none")
.attr("stroke", "gray")
.attr("r",function (d,i){ return radialScale(i + 1)});

const text = svg.select(".chart")
.selectAll("text")
.data(ticks)
.join("text")
.attr("id", function(_,i){return 'scalesid' + i}  ) 
.attr("x", 0)
.attr("y", function (d,i) {return  - radialScale(i + 1)})
.text(d => d.toString());

const lines = svg.select(".chart")
.selectAll("line")
.data(expresions)
.join("line")
.attr("x1", 0)
.attr("y1", 0)
.attr("x2", function (_,i){ return (  + (Math.cos((Math.PI / 2) + (2 * Math.PI * i / expresions.length)) * radialScale(5)))})
.attr("y2",  function (_,i){ return (  - (Math.sin((Math.PI / 2) + (2 * Math.PI * i / expresions.length)) * radialScale(5)))})
.attr("stroke","black");

const line_label = svg.select(".chart")
.selectAll("text2")
.data(expresions)
.join("text")
.attr("id", function(_,i){return 'labelid' + i}  ) 
.attr("x", function (_,i){ return (  + (Math.cos((Math.PI / 2) + (2 * Math.PI * i / expresions.length)) * radialScale(5.5)))})
.attr("y", function (_,i){ return (  - (Math.sin((Math.PI / 2) + (2 * Math.PI * i / expresions.length)) * radialScale(5.5)))})
.text(d => d);

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

const group = svg .select('.chart')
    .selectAll("g.area")
    .data(props.data.channel)  
    .join("g")
    .attr("class", "area")
    .attr("stroke", (d, i) => color(i))
    .attr("fill", (d, i) => color(i))


const area = group
.selectAll('path.area')
//.data([getPathCoordinates(props.data.channel[0].acumulate_expresion)])
.data(function(d) {
  return  [getPathCoordinates(d.acumulate_expresion)]
}) 
.join('path')
.attr('class', 'area')
//.datum(d => getPathCoordinates(d))
.attr("d", line)
.attr("stroke-width", 1)
/* .attr("stroke", (d, i) => color(i))
.attr("fill", (d, i) => color(i)) */
.attr("stroke-opacity", 1)
.attr("opacity", 0.5); 

console.log(props.data.channel[0].acumulate_expresion)


      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
  </g> 
      </svg>);
    };


export default SpiderGraph;