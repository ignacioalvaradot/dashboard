import { useEffect, useRef, useState} from "react";
import * as d3 from 'd3'

const dimensions = {width:300,height:300}
const nodes = [
      { x:  (dimensions.width/2) + 60, y: (dimensions.height/2) + 60, id: 0},
      { x:   (dimensions.width/2) + 60, y: (dimensions.height/2) - 60, id: 1},
      { x:   (dimensions.width/2) - 60, y: (dimensions.height/2) + 60, id: 2},
      { x:   (dimensions.width/2) - 60, y: (dimensions.height/2) - 60, id: 3}
];

const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
];



const FinalGraph = props => {

const ref = useRef();

useEffect(() =>{

    const svg = d3.select(ref.current)
                   .attr('width', dimensions.width)
                   .attr('height', dimensions.height);

           
   
    // nodos:
    svg .selectAll("circle")
        .data(props.data)
        .join("circle")
        .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")")        
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.length) + 0.75)) } )
        .attr("r", d => d.numeroInterv);

 // links:
 svg.selectAll("line")
 .data(props.data)
 .join("line")
 .attr("x1", function(d) { return props.data[d.channelId].x; })
 .attr("y1", function(d) { return props.data[d.channelId].y; })
 .attr("x2", function(d) { return props.data[d.traza].x; })
 .attr("y2", function(d) { return props.data[d.traza].y; })
 .attr("stroke-width", 2)
 .attr("stroke","black");
 
      
      

},[props.data])


return(
    <svg ref={ref}> 
    </svg>
);
}

export default FinalGraph;