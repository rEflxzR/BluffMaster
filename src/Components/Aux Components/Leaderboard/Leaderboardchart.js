import React, { Component } from 'react'
import './chart.css'

function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5
  
  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}

class BarChart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [
				{ name: 'A', value: 20 },
				{ name: 'B', value: 40 },
				{ name: 'C', value: 35 },
				{ name: 'D', value: 50 },
				{ name: 'E', value: 55 },
				{ name: 'F', value: 40 }
			]
		}
	}
	
	render() {
		let barHeight = 30
			
		let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
														<BarGroup d={d} barHeight={barHeight} />
													  </g>)                         
		
		return <svg width="800" height="300" >
		  <g className="container">
			<text className="title" x="10" y="30">Week beginning 9th July</text>
			<g className="chart" transform="translate(100,60)">
			  {barGroups}
			</g>
		  </g>
		</svg>
	  }
}

export default BarChart