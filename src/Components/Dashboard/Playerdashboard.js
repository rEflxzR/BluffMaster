import React, { Component } from 'react'
import axios from 'axios'
import Questioncard from '../Questioncard/Questioncard'

class Playerdashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nextQuestion: false,
            response: '',
            currentQuestionNumber: 0,
            currentQuestion: [],
            currentOptions: [],
            navMessage: 'You Are The IMPOSTER'
        }

        this.playerResponse = this.playerResponse.bind(this)
        this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }

    componentDidMount() {
        document.title = 'Dashboard | Player'
    }

    componentWillUnmount() {
        window.localStorage.clear()
    }

    playerResponse(data) {
        this.setState({ response: data })
    }

    async handleNextQuestionClick() {
        const apiurl = `http://${window.location.hostname}:8000/questions`
        await axios.get(apiurl, {
            headers: {
                authorization: window.btoa('taskforce141'),
                id: window.localStorage.getItem('playerId')
            }
        }).then((res) => {
            if(res.status==200) {
                this.setState({ currentQuestionNumber: this.state.currentQuestionNumber+1, 
                    currentQuestion: res.data.pop(), currentOptions: res.data, 
                    nextQuestion: true })
            }
        })
        .catch((err) => {
            this.setState({ navMessage : "YOU CAN NO LONGER PARTICIPATE FURTHER ROUNDS :(" })
        })
    }

    handleSubmitClick() {
        this.setState({ nextQuestion: false, response: '', currentQuestion: [], currentOptions: [] })
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-light bg-dark">
                    <h3 className="text-light text-center h4" style={{ width: "100vw" }}>{this.state.navMessage}</h3>
                    </nav>
                </div>
                {
                    this.state.nextQuestion ?
                    (
                        <div className="mt-4">
                            <Questioncard 
                            questionNumber={this.state.currentQuestionNumber}
                            question={this.state.currentQuestion}
                            options={this.state.currentOptions}
                            response={this.playerResponse} />
                            <button onClick={this.handleSubmitClick} className="btn btn-lg btn-success">SUBMIT RESPONSE</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={this.handleNextQuestionClick} className="btn btn-lg btn-primary">NEXT QUESTION</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Playerdashboard