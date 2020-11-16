import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Gameplate from './Admingameplate'
import Gamepincard from '../Aux Components/Gamepincard'

class Admindashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pinset: false,
            gamepin: '',
            page: 'home',
            playersJoined: 0,
            logOut: false
        }

        this.handleNewGameButton = this.handleNewGameButton.bind(this)
        this.startGame = this.startGame.bind(this)
        this.handlelogoutclick = this.handlelogoutclick.bind(this)
    }

    componentDidMount() {
        document.title = 'Dashboard | Admin'
    }

    componentWillUnmount() {
        window.localStorage.removeItem('adminLoggedIn')
    }

    handlelogoutclick() {
        this.setState({ logOut: true })  
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

    async startGame() {
        if(this.state.pinset) {
            const apiurl = `http://${window.location.hostname}:8000/startgame`
            const adminId = window.localStorage.getItem('adminId')
            await axios.get(apiurl, {
                headers: {
                    id: adminId
                }
            }).then((res) => {
                if(res.data===true) {
                    this.setState({ page: 'game' })
                }
                else {
                    console.log(res.data)
                    this.setState({ playersJoined: res.data.playersJoined })
                }
            })
        }
    }

    render() {
        if(this.state.logOut) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div>
                    <nav className="navbar navbar-light bg-dark d-flex">
                        <div className="justify-content-center" style={{ width: '90%' }}>
                            <h3 className="text-light text-center h2" style={{ fontSize: "3rem" }}>QUIZ MASTER DASHBOARD</h3>
                        </div>
                        <div className="justify-content-end">
                            <a onClick={this.handlelogoutclick} type="button" className="btn btn-lg text-light">LOGOUT</a>
                        </div>
                    </nav>
                </div>

                {/* CONDTIONALLY SHOW THE HOMEPAGE OR GAMEPAGE */}
                {
                    this.state.page==='home' ? 
                    (
                        <div>
                            
                            <div className="d-flex flex-column justify-content-center mb-4" style={{ height: "30vh" }}>
                                <h2 className="text-center text-light mb-4">Players Joined: {this.state.playersJoined}/6</h2>
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