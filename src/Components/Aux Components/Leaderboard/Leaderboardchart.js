import React, { Component } from 'react'
import './chart.css'

class Chart extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div className="bars ml-2 d-flex align-items-end pt-0" style={{ height: '600px', maxWidth: "620px" }}>
					{
						Object.keys(this.props.scores).map((team) => {
							return <svg className="mx-4" height={Number(this.props.scores[team][1])*0.11 + "%"} width="10%" fill="#1d58bf">
										<rect height="100%" width="100%" />
										<text x="50%" y="50%" font-size="1.5em" text-anchor="middle" stroke="white">{Number(this.props.scores[team][1])}</text>
									</svg>
						})
					}
				</div>

				<div className="ml-2 d-flex align-content-start" style={{ maxWidth: "620px" }}>
					{
						Object.keys(this.props.scores).map((team) => {
							return <div className="mx-4" style={{ width: "10%" }}>
										<h1 className="text-center mb-0">{this.props.scores[team][2]}</h1>
										<h1 className="text-center h4">({Number(this.props.scores[team][1])})</h1>
									</div>
						})
					}
				</div>
			</div>
		)
	}
}

export default Chart