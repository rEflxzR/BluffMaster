import React, { Component } from 'react'
import Questioncard from '../Questioncard/Questioncard'

class Admingamecard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayTab: '',
            qnum: null,
            question: [],
            options: []
        }
    }

    componentDidUpdate() {
        const question = this.props.qdata.pop()
        const options = this.props.data
        const questionnum = this.props.qnum
        this.setState({ qnum: questionnum, question: question, options: options, displayTab: 'question' })
    }

    render() {
        return (
            <div className="Gamecard container mx-0">
                <div className="card text-center" style={{width: "100%", minHeight: "60vh"}}>
                    <div className="d-flex">
                        <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ width: "100%" }}>
                            <li className="nav-item streambtn" role="presentation" style={{ width: "34%" }}>
                                <a className="nav-link active text-dark" type="button" id="question" data-toggle="tab" href="question" role="tab" aria-controls="btech" aria-selected="true">
                                    <span><strong>QUESTION CARD</strong></span>
                                </a>
                            </li>
                            <li className="nav-item streambtn" role="presentation" style={{ width: "33%" }}>
                                <a className="nav-link text-dark" type="button" id="scoreboard" data-toggle="tab" href="scorecard" role="tab" aria-controls="mca" aria-selected="false">
                                    <span><strong>LEADER BOARD</strong></span>
                                </a>
                            </li>
                            <li className="nav-item streambtn" role="presentation" style={{ width: "33%" }}>
                                <a className="nav-link text-dark" type="button" id="poll" data-toggle="tab" href="poll" role="tab" aria-controls="mca" aria-selected="false">
                                    <span><strong>EXIT POLLS</strong></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.displayTab==='question' ? (
                        <Questioncard
                        questionNumber={this.state.qnum}
                        question={this.state.question}
                        options={this.state.options}  />
                    ) : (
                        null
                    )
                }
                {
                    this.state.displayTab==='scoreboard' ? (
                        null
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
        )
    }
}

export default Admingamecard