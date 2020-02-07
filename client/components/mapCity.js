// import React from 'react'
// import * as d3 from 'd3'
// import {default as singleNeighborhood} from '../../public/sandbox/single.json'
// import {default as allNeighborhoods} from '../../public/sandbox/NTA.json'
// import {MapNeighborhood} from './mapNeighborhood'
// //put a single neighborhood's coordinates in a json to use
// // console.log('d3', d3)
// export class CityMap extends React.Component {
//   constructor() {
//     super()
//     this.state = allNeighborhoods
//   }

//   render() {
//     const height = Math.max(
//       document.documentElement.clientHeight,
//       window.innerHeight || 0
//     )
//     const width = height * 1.32465263323
//     // const xExtent = d3.extent(singleNeighborhood, l => l[0])
//     const xScale = d3
//       .scaleLinear()
//       .domain([-74.2555928790719, -73.7000104153247])
//       .range([0, width])

//     // const yExtent = d3.extent(singleNeighborhood, l => l[1])
//     const yScale = d3
//       .scaleLinear()
//       .domain([40.4961236003829, 40.9155410761847])
//       .range([height, 0])
//     const line = d3
//       .line()
//       .x(d => {
//         return xScale(d[0])
//       })
//       .y(d => {
//         return yScale(d[1])
//       })

//     return (
//       <p>
//         <svg width={width} height={height}>
//           {allNeighborhoods.features.map(neighborhood => {
//             return (
//               <MapNeighborhood
//                 key={neighborhood.id}
//                 line={line}
//                 xScale={xScale}
//                 yScale={yScale}
//                 neighborhood={neighborhood}
//                 width={width}
//                 height={height}
//               />
//             )
//           })}
//         </svg>
//       </p>
//     )
//   }
// }
