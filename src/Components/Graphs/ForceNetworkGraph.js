import React, { useRef, useEffect } from "react";
import {
  select,
  hierarchy,
  forceCenter,
  forceSimulation,
  forceManyBody,
  mouse,
  forceX,
  forceY,
  forceCollide,
  forceRadial,
  forceLink
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component, that renders a force layout for hierarchical data.
 */

 const data = {
    "nodes": [
      {"id": 1},
      { "id": 2},
      {"id": 3},
      {"id": 4}
    ],
    "links": [
      {"source": 1,"target": 2},
      {"source": 2,"target": 3},
      {"source": 3,"target": 4},
      {"source": 4,"target": 1},
      {"source": 2,"target": 4},
      {"source": 3,"target": 1} 
    ]
  } 
const dimensions = {width:400, height:400}
function ForceNetworkGraph() {
  const svgRef = useRef();
  /* const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef); */

  // will be called initially and on every data change
  useEffect(() => {
    
    const svg = select(svgRef.current)
                    .attr('width', dimensions.width)
                    .attr('height', dimensions.height)
                    //.attr('transform', 'rotate(45)')
                    .style('background-color','white');

    // centering workaround
     /* svg.attr("viewBox", [
      -dimensions.width / 2,
      -dimensions.height / 2,
      dimensions.width,
      dimensions.height
    ]);  */

    
    const simulation = forceSimulation(data.nodes)
    .force("link", forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
        .force("center", forceCenter(dimensions.width/2,dimensions.height/2))
      .force("charge", forceManyBody().strength(-1000))
      //.alphaMin(0.5)
      .on("tick", () => {
        console.log("current force", simulation.alpha());
        simulation.tick(300);
        // links
        svg
          .selectAll(".link")
          .data(data.links)
          .join("line")
          .attr("class", "link")
          .style("stroke", "#aaa")
          .attr("x1", link => link.source.x)
          .attr("y1", link => link.source.y)
          .attr("x2", link => link.target.x)
          .attr("y2", link => link.target.y);

        // nodes
        svg
          .selectAll(".node")
          .data(data.nodes)
          .join("circle")
          .attr("class", "node")
          .style("fill", "#69b3a2")
          .attr("r", 20)
          .attr("cx", node => node.x + 6)
          .attr("cy", node => node.y - 6);
          

      
    })
    
  }, [data, dimensions]);

  return (
    
      <svg ref={svgRef}></svg>
    
  );
}

export default ForceNetworkGraph;