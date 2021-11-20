import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const data = {
    "nodes": [
      {
        "id": 1,
        //"name": "A"
      },
      {
        "id": 2,
        //"name": "B"
      },
      {
        "id": 3,
        //"name": "C"
      },
      {
        "id": 4,
        //"name": "D"
      }
    ],
    "links": [
  
      {
        "source": 1,
        "target": 2
      },
      {
        "source": 2,
        "target": 3
      },
      {
        "source": 3,
        "target": 4
      },
  
      {
        "source": 4,
        "target": 1
      }
      
    ]
  } 

  const NetworkGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:400, height:200}
   
    
    
      useEffect(() => {
      

        const svg = d3.select(areaChart.current)
                     .attr('width', dimensions.width)
                    .attr('height', dimensions.height)
                    .style('background-color','white') 

        const nodo = 
        svg
                    .selectAll("circle")
                    .data(props.data)
                    .join("circle")
                    //.enter()
                    //.append("circle")
                    .attr("class", "nI")
                    .attr("r", d => d.valor   /* Math.floor((Math.random() * 40) + 1) */ )
                    .attr("id",d => d.channelId)
                    .attr("id2",d => d.traza)
                    .style("fill", "#69b3a2")
                    .attr("cx", d => d.valor  *14)
                    .attr('cy', 50)
        //testing links
  
        const link =         
        svg
                    .selectAll("line")
                    .data(props.data)
                    .join("line")
                    //.enter()
                    //.append("circle")
                    .style("stroke", "lightgreen")
                    .style("stroke-width",d => d.numeroInterv )
                    .attr("id",d => d.channelId)
                    .attr("id2",d => d.traza)
                    .style("fill", "#69b3a2")
                    .attr("x1", 0)
                    .attr("y1", 50)
                    .attr("x2", 200)
                    .attr("y2", 50); 
                    
      
 /*      const linkeo=svg
                    .append('path')
                    .attr('d', link)
                    .attr('stroke', 'black')
                    .attr('fill', 'none');  */

/*         const link = svg
                      .selectAll("line")
                      .data(data.links)
                      .enter()
                      .append("line")
                        .style("stroke", "#aaa")

        var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-500))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))     // This force attracts nodes to the center of the svg area
      .on("end", ticked);
      //.on("tick", () => this.tick());

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        nodo
             .attr("cx", function (d) { return d.x+6; })
             .attr("cy", function(d) { return d.y-6; });
      } 
       */

      //svg.selectAll("*").exit();
//console.log(nodo._groups);
    
      }, [props.data]);
    
      return <svg ref={areaChart}> </svg>;
    };


export default NetworkGraph;