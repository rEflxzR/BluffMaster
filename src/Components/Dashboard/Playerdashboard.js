import React, { Component } from 'react'
import axios from 'axios'
import Questioncard from '../Aux Components/PlayerQuestioncard/PlayerQuestioncard'

class Playerdashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nextQuestion: false,
            response: {},
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
            if(res.status==204) {
                console.log("NO DATA")
            }
        })
        .catch((err) => {
            console.log(err)
            this.setState({ navMessage : "YOU CAN NO LONGER PARTICIPATE FURTHER ROUNDS :(" })
        })
    }

    async handleSubmitClick() {
        const apiurl = `http://${window.location.hostname}:8000/playerresponse`
        const playerId = '75uhr-jf927-sd78gh2-32j78'
        const answer = this.state.response
        await axios.post(apiurl, {playerId, answer}).then((res) => {
            this.setState({ nextQuestion: false, response: '', currentQuestion: [], currentOptions: [] })
        }).catch((err) => {
            alert('OPTION ALREADY SELECTED!!!')
        })
        // this.setState({ nextQuestion: false, response: '', currentQuestion: [], currentOptions: [] })
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


// ARRAY SHUFFLE FUNCTION
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
  
//     return array;
//   }