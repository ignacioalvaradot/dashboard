import { useEffect, useRef, useState} from "react";
import * as d3 from 'd3'

const dimensions = {width:300,height:300}
/* const nodes = [
      { x:  (dimensions.width/2) + 60, y: (dimensions.height/2) + 60, id: 0},
      { x:   (dimensions.width/2) + 60, y: (dimensions.height/2) - 60, id: 1},
      { x:   (dimensions.width/2) - 60, y: (dimensions.height/2) + 60, id: 2},
      { x:   (dimensions.width/2) - 60, y: (dimensions.height/2) - 60, id: 3}
];

const links = [
      { source: 0, target:1 },
      { source: 0, target:2 },
      { source: 0, target:3 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
]; */





const FinalGraph = props => {

const [id,setNodos] = useState([]);
//setData(props.data);
const ref = useRef();



useEffect(() =>{
    /* if(id.length > 4 ){
        return setNodos([])
    } */

/*     {props.data.channel.map((canales,i) => (
        
      //  setNodos({...id, channelId: canales.channelId, numeroInterv: canales.numeroInterv})
        //setNodos(prevState => ({ ...prevState, channelId: canales.channelId, numeroInterv: canales.numeroInterv}))
        setNodos(prevState => [...prevState, {channelId: canales.channelId, x:(dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75))}])
        
))} */

    const svg = d3.select(ref.current)
                   .attr('width', dimensions.width)
                   .attr('height', dimensions.height);

           
   
    // nodes:
   const nodos = svg .selectAll("circle")
        .data(props.data.channel)
        .join("circle")
        .attr("id", function(d,i){return 'name' + i}  )
        .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")")        
        .attr('cx', function(d,i) { 
            return (dimensions.width/4)*Math.cos(2 * Math.PI * ((i/ props.data.channel.length)+ 0.75)) } )
        .attr('cy', function(d,i) {     
                return (dimensions.height/4)*Math.sin(2 * Math.PI * ((i/ props.data.channel.length) + 0.75)) } )
        .attr("r", d => d.numeroInterv);

 // links:
   svg.selectAll("line")
 .data(props.data.trace_delta)
 .join("line")
 .attr("transform", "translate("+dimensions.width/2 + "," + dimensions.height/2 + ")") 
 .attr("x1", function(d,i) { return d3.select( '#name' + d.source ).attr('cx') })
 .attr("y1", function(d) { return d3.select( '#name' + d.source ).attr('cy') })
 .attr("x2", function(d) { return d3.select( '#name' + d.target ).attr('cx') })
 .attr("y2", function(d) { return d3.select( '#name' + d.target ).attr('cy') }) 
 .attr("stroke-width", 5/* d => d.weigth */)
 .attr("stroke","black"); 
 

//console.log (id)


},[props.data])


return(
    <svg ref={ref}> 
    </svg>
);
}

export default FinalGraph;