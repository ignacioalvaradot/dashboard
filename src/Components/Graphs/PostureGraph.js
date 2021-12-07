import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


const data = [
  {item: 'A', count: 590},
  {item: 'B', count: 291},
  {item: 'C', count: 348},
  {item: 'D', count: 145},
  {item: 'E', count: 46}
]



  const NetworkGraph = props => {
    const areaChart = useRef(null);
    const dimensions = {width:300, height:300}

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    var mycolors = ["#FFA500","#008000"]
    var m = 10,
    r = 100

    
    
        //var pie = d3.pie().value(function(d) { return d; }).sort(null);
        

   /*  const pie = d3.layout.pie()
    .value(function (d) { return +d.pcArray; })
    .sort(null); */

      useEffect(() => {
        //const pie= d3.pie().value(d => d.count)(data)
        const pie = (data)=> d3.pie().value(d => d.value)(data);
        const arc =(radio) => d3.arc()
         .innerRadius(0)
         .outerRadius(radio)

       /*  const data = createPie(props.data.channel);
    const group = d3.select(areaChart.current);
    const groupWithData = group.selectAll("g.arc").data(data); */

   /*  var nested_data = d3.groups()
  .key(function(d) {
    return d.acumulate_posture;
  })
  .entries(props.data.channel); */

        const svg = d3.select(areaChart.current)
        .attr('width', dimensions.width)
       .attr('height', dimensions.height)
       .style('background-color','white')

       var g = svg .select('.chart')
       .selectAll("g.arc")
       .data(props.data.channel)  
       .join("g")
       .attr("class", "arc")
       .attr("transform",function(_,i) { 
       
      return `translate(${(dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75))}, ${(dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) })`});
        
        const nodo = 
        g.selectAll("path.pie")
        //.data(pie(props.data.channel[0].acumulate_posture))
        .data(function(d) {
          return pie(d.acumulate_posture)
        }) 
        /* .data(function(d) {
          return d.channel; // tell d3 where the children are
        }) */
        .join("path")
        .attr('class', 'pie')
        .attr("fill", function (d, i) {
          //return colors(i);
          return mycolors[i];
      })
      /* .attr('d', function(d) {     
        return arc(d.total)} ); */
        //.attr("d", arc(d3.select(this.parentNode).datum().total));
        .attr("d", arc(30));
        //.attr("d", (_, i, n) => arc(d3.select(n[i].parentNode).datum().total));
        //.attr("d", arc(props.data.channel[0].total));
        console.log(props.data.channel) 
        

    
     
        
        
    
      }, [props.data]);
    
      return (<svg ref={areaChart}> 
      <g className="chart" transform={`translate(${dimensions.width/2} ${dimensions.height/2})`}>
  </g> 
      </svg>);
    };


export default NetworkGraph;