import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

const data = [
{ year:'2017', count:52
},
{ year:'2019', count:32
},
{ year:'2002', count:3
},
{ year:'2034', count:23
},
]


function AreaChart(){
const areaChart = useRef()
const dimensions = {width:800, height:400}

useEffect(() =>{

    const svg = d3.select(areaChart.current)
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
                .style('background-color','black')

},[])

return(
    
    <svg ref={areaChart}> </svg>
)

}
export default AreaChart;