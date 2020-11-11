import React, { Component } from 'react'
import './PlayerQuestioncard.css'

class Questioncard extends Component {
    constructor(props) {
        super(props)

        this.handleOptionClick = this.handleOptionClick.bind(this)
    }

    handleOptionClick(evt) {
        if(evt.currentTarget.getAttribute('value')!=null && evt.currentTarget.getAttribute('points')!=null) {
            this.props.response(
                {
                    value: evt.currentTarget.getAttribute('value'),
                    points: evt.currentTarget.getAttribute('points')
                }
            )
        }
    }

    render() {
        if(this.props=={}) {
            return null
        }
        return (
            <div className="d-flex justify-content-center">
                <div className="Card">
                    <div className="card qcardbodymain">
                        <div className="card-body qcardbody mx-2 px-0 pb-0 mb-2">
                            <h2 className="card-title text-center mb-2">QUESTION {this.props.questionNumber}</h2>
                            <p className="card-text text-center rounded mx-2 p-2"><strong>{this.props.question}</strong></p>
                            <div className="list-group mx-2 mt-2" id="list-tab" role="tablist">
                                {
                                    this.props.options.map((opt) => {
                                    return <button onClick={this.handleOptionClick}
                                            className="list-group-item rounded text-center list-group-item-action my-1"
                                            key={opt[1]} value={opt[0]} points={opt[1]} 
                                            data-toggle="list" role="tab"><strong>{opt[0]}</strong>
                                            </button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Questioncard