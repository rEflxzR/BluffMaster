import React, { Component } from 'react'
import axios from 'axios'
import './AdminQuestioncard.css'

class Questioncard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUserAnswer: [],
            showAll: false
        }

        this.handleOptionClick = this.handleOptionClick.bind(this)
        this.handleShowButton = this.handleShowButton.bind(this)
        this.handlePlayerResponse = this.handlePlayerResponse.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps!==this.props) {
            this.setState({ currentUserAnswer: [], showAll: false })
        }
    }

    handleOptionClick(evt) {
        console.log(evt.target.querySelector('div').className)
        evt.target.querySelector('div').className = "text-center"
    }

    handleShowButton() {
        this.setState({ showAll: true })
    }

    async handlePlayerResponse() {
        const apiurl = `http://${window.location.hostname}:8000/getresponse`
        await axios.get(apiurl).then((res) => {
            this.setState({ currentUserAnswer: [...this.state.currentUserAnswer, String(res.data)] })
        })
    }

    render() {
        if(this.props==={}) {
            return null
        }
        return (
            <div className="d-flex justify-content-center">
                <div className="Card">
                    <div className="card qcard">
                        <div className="card-body qcardbodya mx-2 px-0 pb-0 mb-2">
                            <h2 className="card-title text-light text-center mb-2">QUESTION {this.props.questionNumber}</h2>
                            <p className="card-text text-center rounded mx-2 p-2"><strong>{this.props.question}</strong></p>
                            <div className="list-group mx-2 mt-2" id="list-tab" role="tablist">
                                {
                                    this.props.options.map((opt) => {
                                        if(this.state.currentUserAnswer.indexOf(opt[0])!== -1) {
                                            return <div aria-hidden="true" onClick={this.handleOptionClick} className="list-group-item rounded text-center my-1">
                                                <div className="text-center">
                                                    <strong>{opt[0]}</strong> ({opt[1]} Points)
                                                </div>
                                            </div>
                                        }
                                        return <div aria-hidden="true" onClick={this.handleOptionClick} className="list-group-item rounded text-center my-1">
                                                    <div className={this.state.showAll ? "text-center" : "text-hide"}>
                                                        <strong>{opt[0]}</strong> ({opt[1]} Points)
                                                    </div>
                                                </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-lg btn-danger mt-3" 
                        onClick={this.handleShowButton}><strong>SHOW ALL OPTIONS</strong></button>

                        <button className="btn btn-lg btn-warning mt-3" 
                        onClick={this.handlePlayerResponse}><strong>SHOW PLAYER RESPONSE</strong></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Questioncard