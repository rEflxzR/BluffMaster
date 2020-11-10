import React, { Component } from 'react'
import axios from 'axios'
import Gameplate from './Admingameplate'
import Admingamecard from '../Aux Components/Admingamecard'
import Gamepincard from '../Aux Components/Gamepincard'

class Admindashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pinset: false,
            gamepin: '',
            page: 'home'
        }

        this.handleNewGameButton = this.handleNewGameButton.bind(this)
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        document.title = 'Dashboard | Admin'
    }

    componentWillUnmount() {
        window.localStorage.removeItem('adminLoggedIn')
    }

    async handleNewGameButton() {    
        const newgamepin = Math.floor(100000 + Math.random() * 900000)
        this.setState({ gamepin: newgamepin, pinset: true })
        const adminId = window.localStorage.getItem('adminId')
        const apiurl = `http://${window.location.hostname}:8000/newgamepin`

        await axios.post(apiurl, {adminId, newgamepin}).then((res) => {
            console.log("New Gamepin Registered Successfully")
        })

    }

    startGame() {
        if(this.state.pinset) {
            this.setState({ page: 'game' })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-light bg-dark justify-content-center">
                    <h3 className="text-light text-center h2" style={{ fontSize: "4rem" }}>QUIZ MASTER DASHBOARD</h3>
                    </nav>
                </div>

                {/* CONDTIONALLY SHOW THE HOMEPAGE OR GAMEPAGE */}
                {
                    this.state.page=='home' ? 
                    (
                        <div>
                            <div className="d-flex align-items-end mb-4" style={{ height: "30vh" }}>
                                <div className="d-flex justify-content-center" style={{ width: "100vw" }}>
                                    <button onClick={this.handleNewGameButton}
                                    disabled={this.state.pinset}
                                    className="btn btn-warning btn-lg"><strong>SET NEW GAMEPIN</strong></button>
                                    
                                </div>
                            </div>
                            {/* CONDITIONALLY LOAD THE GAMEPIN CARD */}
                            {
                                this.state.pinset ? (
                                    <div className="d-flex justify-content-center mt-5" style={{ width: "100vw" }}>
                                        <Gamepincard 
                                        gamepin={this.state.gamepin} 
                                        gamestart={this.startGame} />
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    ) : (
                        <Gameplate />
                    )
                }
            </div>
        )
    }
}

export default Admindashboard