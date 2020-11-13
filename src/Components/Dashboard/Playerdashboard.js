import React, { Component } from 'react'
import axios from 'axios'
import Questioncard from '../Aux Components/PlayerQuestioncard/PlayerQuestioncard'
import Pollbooth from '../Aux Components/Pollbooth'


// SHUFFLER FUNCTION
function shuffleArray(array) {
    let currentIndex = array.length-1, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}


class Playerdashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nextQuestion: false,
            response: {},
            currentQuestionNumber: 0,
            currentQuestion: [],
            currentOptions: [],
            navMessage: 'There Is An Imposter Among You Guys',
            showPoll: false,
            pollData: []
        }

        this.playerResponse = this.playerResponse.bind(this)
        this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this)
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.handlePollBooth = this.handlePollBooth.bind(this)
        this.toggleBooth = this.toggleBooth.bind(this)
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
                console.log(res.data)
                if(res.data.doShuffle) {
                    this.setState({ currentQuestionNumber: this.state.currentQuestionNumber+1, 
                        currentQuestion: res.data.qdata.pop(), currentOptions: shuffleArray(res.data.qdata), 
                        nextQuestion: true, navMessage: 'You are Not The Imposter' })
                }
                else {
                    this.setState({ currentQuestionNumber: this.state.currentQuestionNumber+1, 
                        currentQuestion: res.data.qdata.pop(), currentOptions: res.data.qdata, 
                        nextQuestion: true, navMessage: 'You are The Imposter' })
                }
            }
        })
        .catch((err) => {
            console.log(err)
            this.setState({ navMessage : "YOU CAN NO LONGER PARTICIPATE FURTHER ROUNDS :(" })
        })
    }

    async handleSubmitClick() {
        const apiurl = `http://${window.location.hostname}:8000/playerresponse`
        const playerId = window.localStorage.getItem('playerId')
        const answer = this.state.response
        await axios.post(apiurl, {playerId, answer}).then((res) => {
            this.setState({ nextQuestion: false, response: '', currentQuestion: [], currentOptions: [] })
        }).catch((err) => {
            alert('OPTION ALREADY SELECTED!!!')
        })
        // this.setState({ nextQuestion: false, response: '', currentQuestion: [], currentOptions: [] })
    }

    async handlePollBooth() {
        const qnum = this.state.currentQuestionNumber
        const apiurl = `http://${window.location.hostname}:8000/playerpoll`
        const playerId = window.localStorage.getItem('playerId')
        if(qnum%2==0 && qnum<9 && qnum>=0) {
            axios.get(apiurl, {
                headers: {
                    id: playerId
                }
            }).then((res) => {
                if(res.status==200) {
                    this.setState({ showPoll: true, pollData: res.data })
                }
            })
        }
    }

    toggleBooth() {
        this.setState({ showPoll: !this.state.showPoll })
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
                            <div className="d-flex justify-content-center my-3">
                                <button onClick={this.handleSubmitClick} 
                                className="btn btn-lg btn-info"><strong>SUBMIT RESPONSE</strong></button>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex flex-column justify-content-center" style={{ minHeight: '60vh' }}>
                            <h2 className="h2 text-center text-light">
                                COMPLETED: {this.state.currentQuestionNumber}/10 Questions</h2>
                                
                            <div className="d-flex justify-content-center mt-4">
                                <button onClick={this.handleNextQuestionClick} 
                                className="btn btn-lg btn-primary"><strong>NEXT QUESTION</strong></button>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button onClick={this.handlePollBooth} 
                                className="btn btn-lg btn-warning"><strong>POLL BOOTH</strong></button>
                            </div>
                            {
                                this.state.showPoll ? (
                                    <div className="mt-5">
                                        <Pollbooth toggleBooth={this.boothToggle} data={this.state.pollData} />
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Playerdashboard