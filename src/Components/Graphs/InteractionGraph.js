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



const InteractionGraph = props => {


    
const ref = useRef();

useEffect(() =>{

  

    const svg = d3.select(ref.current)
                   .attr('width', dimensions.width)
                   .attr('height', dimensions.height);

    const g = svg.append("g").attr("transform", "rotate(45,"+ dimensions.width/2 +"," + dimensions.height/2 +")")
           
    // links:
    g.selectAll("line")
      .data(props.data)
      .join("line")
      .attr("x1", function(d) { return props.data[d.channelId].x; })
      .attr("y1", function(d) { return props.data[d.channelId].y; })
      .attr("x2", function(d) { return props.data[d.traza].x; })
      .attr("y2", function(d) { return props.data[d.traza].y; })
      .attr("stroke-width", 2)
      .attr("stroke","black");
      
    // nodos:
    g .selectAll("circle")
        .data(props.data)
        .join("circle")
      /* .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; }) */


      .attr('cx', function(d) {  
        if (d.channelId == 0 ) { return ((dimensions.width/2) + 60); } 
        if (d.channelId == 1 ) { return ((dimensions.width/2) + 60); }
        if (d.channelId== 2 ) { return ((dimensions.width/2) - 60); }
        if (d.channelId == 3 ) { return ((dimensions.width/2) - 60); } 
      } )

      .attr('cy', function(d) {  
        if (d.channelId == 0 ) { return ((dimensions.height/2) + 60); } 
        if (d.channelId == 1 ) { return ((dimensions.height/2) - 60); }
        if (d.channelId == 2 ) { return ((dimensions.height/2) + 60); }
        if (d.channelId == 3 ) { return ((dimensions.height/2) - 60); } 
      } )
      .attr("r", d => d.numeroInterv);

      
      
      

},[props.data])


return(
    <svg ref={ref}> 
    </svg>
);
}

export default InteractionGraph;