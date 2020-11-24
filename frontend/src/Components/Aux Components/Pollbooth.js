import React, { Component } from 'react'
import axios from 'axios'

class Pollbooth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedTeam: ''
        }

        this.handleFormSubmitClick = this.handleFormSubmitClick.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange(evt) {
        this.setState({ selectedTeam: evt.currentTarget.value })
    }

    async handleFormSubmitClick(evt) {
        evt.preventDefault()
        if(this.state.selectedTeam==='') {
            alert("NOTA is NOT an Option!!!")
        }
        else {
            const apiurl = `http://${window.location.hostname}:8000/pollresponse`
            const playerId = window.localStorage.getItem('playerId')
            const response = this.state.selectedTeam
            await axios.post(apiurl, {playerId, response}).then((res) => {
                console.log("Response Submitted Successfully")
                this.props.toggleBooth()
            }).catch((err) => {
                console.log("Some Error Ocurred while Submitting your response")
            })
        }
    }

    render() {
        return(
            <div className="d-flex justify-content-center">
                <div class="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <form style={{ width: "100%" }}>
                            {
                                Object.keys(this.props.data).map((team) => {
                                    if(team===window.localStorage.getItem('playerId')) {
                                        return null
                                    }
                                    else {
                                        return <div className="d-flex justify-content-center">
                                                <input onChange={this.handleFormChange} type="radio" value={team} name="vote" />
                                                <label className="ml-2 h5">TEAM {this.props.data[team]}</label>
                                            </div>
                                    }
                                })
                            }
                            
                            <div className="d-flex justify-content-center">
                                <button onClick={this.handleFormSubmitClick} className="btn btn-lg btn-block btn-success">VOTE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pollbooth