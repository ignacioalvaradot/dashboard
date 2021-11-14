import React, {useEffect, useRef} from 'react'
import * as d3 from "d3";

const data = [
  { year:'2017', count:52
  },
  { year:'2018', count:60
  },
  { year:'2019', count:120
  },
  { year:'2020', count:97
  },
  ]

const MultilineChart = () => {
const areaChart = useRef()
const dimensions = {width:800, height:400}

  useEffect(() => {
    const svg = d3.select(areaChart.current)
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
                .style('background-color','white')


    const x = d3.scaleTime()
              .domain(d3.extent(data, d=>d3.timeParse('%Y')(d.year)))
              .range([0, dimensions.width-100])

    svg.append('g')
        .call(d3.axisBottom(x))
        .attr('transform', 'translate(20,350)')


      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d=>d.count)])
        .range([dimensions.height-100,0])

svg.append('g')
  .call(d3.axisLeft(y))
  .attr('transform', 'translate(20,50)')

  const area = d3.area()
              .x(d=>x(d3.timeParse('%Y')(d.year)))
              .y0(y(0))
              .y1(d=>y(d.count))

  svg.append('path')
      .datum(data)
      .attr('d',area)
      .attr('fill', '#f25cb4')
      .attr('stroke','#c70469')
      .attr('storke-width', 2)
      .attr('transform','translate(20,50)')



  }, []);

  return <svg ref={areaChart}> </svg>;
};

export default MultilineChart;
