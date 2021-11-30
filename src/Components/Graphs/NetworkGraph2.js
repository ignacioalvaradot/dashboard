import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


  const NetworkGraph = props => {
    const areaChart = useRef()
    const dimensions = {width:300, height:300}


    var bend = -0.9;
    var aLen = 5, aWidth = 5;
    var sArrow = false, eArrow = false;
    var startRadius = 15 + 1; // 10 radio maximo de pelota
    var endRadius = 15 + 5;


    function drawBend(x1, y1, x2, y2, bend, aLen, aWidth, sArrow, eArrow, startRadius, endRadius){
      var mx, my, dist, nx, ny, x3, y3, cx, cy, radius, vx, vy, a1, a2;
      var arrowAng,aa1,aa2,b1;
      // find mid point
      mx = ( x1 + x2) / 2;  // Error cuando x1 + x2 = 0, comprobar con Math.abs()
      my = (y1 + y2) / 2;   // Lo mismo que arriba
      
      // get vector from start to end
      nx = x2 - x1;
      ny = y2 - y1;
      
      // find dist
      dist = Math.sqrt(nx * nx + ny * ny);
      
      // normalise vector
      nx /= dist;
      ny /= dist;
      
      // The next section has some optional behaviours
      // that set the dist from the line mid point to the arc mid point
      // You should only use one of the following sets
      
      //-- Uncomment for behaviour of arcs
      // This make the lines flatten at distance
      //b1 =  (bend * 300) / Math.pow(dist,1/4);

      //-- Uncomment for behaviour of arcs
      // Arc bending amount close to constant
      // b1 =  bend * dist * 0.5

      b1 = bend * dist

      // Arc amount bend more at dist
      x3 = mx + ny * b1;
      y3 = my - nx * b1;

      // get the radius
      radius = (0.5 * ((x1-x3) * (x1-x3) + (y1-y3) * (y1-y3)) / (b1));

      // use radius to get arc center
      cx = x3 - ny * radius;
      cy = y3 + nx * radius;

      // radius needs to be positive for the rest of the code
      radius = Math.abs(radius);

      


      // find angle from center to start and end
      a1 = Math.atan2(y1 - cy, x1 - cx);
      a2 = Math.atan2(y2 - cy, x2 - cx);
      
      // normalise angles
      a1 = (a1 + Math.PI * 2) % (Math.PI * 2);
      a2 = (a2 + Math.PI * 2) % (Math.PI * 2);
      // ensure angles are in correct directions
      if (bend < 0) {
          if (a1 < a2) { a1 += Math.PI * 2 }
      } else {
          if (a2 < a1) { a2 += Math.PI * 2 }
      }
      
      // convert arrow length to angular len
      arrowAng = aLen / radius  * Math.sign(bend);
      // get angular length of start and end circles and move arc start and ends
      
      a1 += startRadius / radius * Math.sign(bend);
      a2 -= endRadius / radius * Math.sign(bend);
      aa1 = a1;
      aa2 = a2;

      // check for too close and no room for arc
      if ((bend < 0 && a1 < a2) || (bend > 0 && a2 < a1)) {
          return;
      }
      // is there a start arrow
      if (sArrow) { aa1 += arrowAng } // move arc start to inside arrow
      // is there an end arrow
      if (eArrow) { aa2 -= arrowAng } // move arc end to inside arrow
      
      // check for too close and remove arrows if so
      if ((bend < 0 && aa1 < aa2) || (bend > 0 && aa2 < aa1)) {
          sArrow = false;
          eArrow = false;
          aa1 = a1;
          aa2 = a2;
      }
      // draw arc
      
      //ctx.beginPath();
      var path = d3.path();
      path.arc(cx, cy, radius, aa1, aa2, bend < 0)
   
     return path;
 
    }


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
        .attr("id", function(d,i){return 'name' + i}  )
       // .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")")
       .attr("fill", "orange")    
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .attr("r", d => d.numeroInterv);

        //var Str = svg.selectAll("circles")

        svg
        .select('.chart')
        .selectAll('path.line')
        .data(props.data.trace_delta)
        .join('path')
        .attr('class', 'line')
        .style("fill-opacity",0)
        .attr('stroke','black')
        //.attr("id",function(d,i) { return d3.select( '#name' + i ).attr('id') } )
       /*  .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")") 
        .attr("x1", function(d,i) { return d3.select( '#name' + d.source ).attr('cx') })
        .attr("y1", function(d) { return d3.select( '#name' + d.source ).attr('cy') })
        .attr("x2", function(d) { return d3.select( '#name' + d.target ).attr('cx') })
        .attr("y2", function(d) { return d3.select( '#name' + d.target ).attr('cy') }) */

         .attr("d", function(d) {
          var dx = d3.select( '#name' + d.target ).attr('cx')  - d3.select( '#name' + d.source ).attr('cx'),
              dy = d3.select( '#name' + d.target ).attr('cy') - d3.select( '#name' + d.source ).attr('cy'),
              dr = Math.sqrt(dx * dx + dy * dy);

             var offsetX = (dx * d3.select( '#name' + d.target ).attr('r')) / dr;
              var offsetY = (dy *d3.select( '#name' + d.target ).attr('r')) / dr;
          return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy') + "A" + dr + "," + dr + " 0 0,1 " + d3.select( '#name' + d.target ).attr('cx') + "," + d3.select( '#name' + d.target ).attr('cy')
          //return "M" + d3.select( '#name' + d.source ).attr('cx') + "," + d3.select( '#name' + d.source ).attr('cy')+ "L" + (d3.select( '#name' + d.target ).attr('cx') - offsetX) + "," + (d3.select( '#name' + d.target ).attr('cy') - offsetY);
          })
          .attr("d", function(d) {

            // length of current path
            var pl = this.getTotalLength(),
              // radius of circle plus backoff
              r = (12) + 20,
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