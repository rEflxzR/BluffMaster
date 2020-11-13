import React, { Component } from 'react'
import axios from 'axios'
import Questioncard from '../Aux Components/AdminQuestioncard/AdminQuestioncard'
import Chart from '../Aux Components/Leaderboard/Leaderboardchart'
import './Admindashboard.css'

class Gameplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentQuestionNumber: 0,
            currentQuestion: [],
            currentOptions: [],
            displayTab: '',
            scores: []
        }

        this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this)
        this.handleQuestionTabClick = this.handleQuestionTabClick.bind(this)
        this.handleScoreboardTabClick = this.handleScoreboardTabClick.bind(this)
        this.handlePollTabClick = this.handlePollTabClick.bind(this)
        this.handlePollBoothToggler = this.handlePollBoothToggler.bind(this)
    }

    handleQuestionTabClick() {
        if(this.state.currentQuestionNumber) {
            this.setState({ displayTab: 'question' })
        }
    }

    async handleScoreboardTabClick() {
        this.setState({ displayTab: 'scoreboard' })
        const apiurl = `http://${window.location.hostname}:8000/scoreboard`
        const adminId = window.localStorage.getItem('adminId')
        await axios.get(apiurl, {
            headers: {
                id: adminId
            }
        }).then((res) => {
            this.setState({ scores: res.data })
        })
    }

    handlePollTabClick() {
        const qnum = this.state.currentQuestionNumber
        if(qnum>0 && qnum%2==0 && qnum<9) {
            this.setState({ displayTab: 'poll' })
        }
    }

    async handleNextQuestionClick() {
        const apiurl = `http://${window.location.hostname}:8000/nextquestion`
        const adminId = window.localStorage.getItem('adminId')
        await axios.post(apiurl, {adminId}).then((res) => {
            this.setState(st => ({
                currentQuestionNumber: st.currentQuestionNumber+1,
                currentQuestion: res.data.pop(),
                currentOptions: res.data,
                displayTab: 'question'
            }), () => {
                this.handleQuestionTabClick()
            })
        })
    }

    handlePollBoothToggler() {
        const apiurl = `http://${window.location.hostname}:8000/togglepolls`
        const adminId = window.localStorage.getItem('adminId')
        axios.post(apiurl, {adminId}).then((res) => {
            console.log("POLL TOGGLED")
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col col-10 offset-1 mt-5 d-flex">
                    <div className="d-flex align-items-center">
                        <h3 className="text-light h2">Current Question Number: {this.state.currentQuestionNumber}</h3>
                    </div>

                    <div className="Gamecard container mx-0">
                        <div className="card platecard text-center" style={{width: "100%", minHeight: "60vh"}}>
                            <div className="d-flex">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation" style={{ width: "34%" }}>
                                        <a onClick={this.handleQuestionTabClick} className="nav-link active text-dark" type="button" id="question" data-toggle="tab" href="question" role="tab" aria-controls="btech" aria-selected="false">
                                            <span><strong>QUESTION CARD</strong></span>
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a onClick={this.handleScoreboardTabClick} className="nav-link text-dark" type="button" id="scoreboard" data-toggle="tab" href="scorecard" role="tab" aria-controls="mca" aria-selected="false">
                                            <span><strong>LEADER BOARD</strong></span>
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a onClick={this.handlePollTabClick} className="nav-link text-dark" type="button" id="poll" data-toggle="tab" href="poll" role="tab" aria-controls="mca" aria-selected="false">
                                            <span><strong>EXIT POLLS</strong></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="my-5">
                                {
                                this.state.displayTab==='question' ? (
                                        <Questioncard
                                        questionNumber={this.state.currentQuestionNumber}
                                        question={this.state.currentQuestion}
                                        options={this.state.currentOptions}  />
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    this.state.displayTab==='scoreboard' ? (
                                        <div className="d-flex justify-content-center">
                                            <Chart scores={this.state.scores} />
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    this.state.displayTab==='poll' ? (
                                        null
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-center">
                    <button className="btn btn-lg btn-warning mb-3"
                            disabled={this.state.currentQuestionNumber%2==0 && this.state.currentQuestionNumber<9
                                && this.state.currentQuestionNumber>=0 ? false : true}
                            onClick={this.handlePollBoothToggler}
                            style={{ whiteSpace: 'nowrap' }}>
                            <strong>TOGGLE POLLING BOOTH</strong>
                        </button>
                        <button className="btn btn-lg btn-primary mt-3"
                            onClick={this.handleNextQuestionClick}
                            style={{ whiteSpace: 'nowrap' }}>
                            <strong>NEXT QUESTION</strong>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gameplate