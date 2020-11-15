import React, { Component } from 'react'
import axios from 'axios'

class PollChart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			kickedOutTeam: '',
			pollSubmitted: false
		}

		this.handlePollReset = this.handlePollReset.bind(this)
		this.handlePollSubmit = this.handlePollSubmit.bind(this)
	}

	async handlePollReset() {
		const apiurl = `http://${window.location.hostname}:8000/pollreset`
		const adminId = window.localStorage.getItem('adminId')
		await axios.post(apiurl, {adminId}).then((res) => {
			this.props.pollreset(res.data)
		})
	}

	async handlePollSubmit() {
		const apiurl = `http://${window.location.hostname}:8000/pollsubmit`
		const adminId = window.localStorage.getItem('adminId')
		await axios.post(apiurl, {adminId}).then((res) => {
			console.log(res.data)
			this.setState({ kickedOutTeam: String(res.data) })
		})
	}

	render() {
		return (
			<div>
				<div className="card text-center" style={{width: "18rem"}}>
					<div className="card-body">
						<h5 className="card-title h3 mb-4">VOTING RESULTS</h5>
						{
							Object.keys(this.props.polldata).map((team) => {
								return <h5 className="card-text">Team {this.props.polldata[team][0]}: {this.props.polldata[team][1]} Vote(s)</h5>
							})
						}
						<div className="mb-2 mt-4" style={{ width: '100%' }}>
							<button onClick={this.handlePollReset} disabled={this.state.pollSubmitted ? true : false}
							className="btn btn-block btn-lg btn-warning"><strong>Poll Reset</strong></button>
						</div>
						<div style={{ width: '100%' }}>
							<button onClick={this.handlePollSubmit} disabled={this.state.pollSubmitted ? true : false}
							className="btn btn-block btn-lg btn-danger"><strong>Submit Results</strong></button>
						</div>
						{
							this.state.kickedOutTeam==='' ? (
								null
							) : (
								<div className="mt-4">
									<h3>End of The Line TEAM-{this.state.kickedOutTeam} :(</h3>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default PollChart