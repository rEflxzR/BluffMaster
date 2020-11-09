import React, { Component } from 'react'
import axios from 'axios'

class Admindashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gamepin: '',
            page: 'start'
        }

        this.handleNewGameButton = this.handleNewGameButton.bind(this)
    }

    componentDidMount() {
        document.title = 'Dashboard | Admin'
    }

    componentWillUnmount() {
        window.localStorage.removeItem('adminLoggedIn')
    }

    handleNewGameButton() {
        const newgamepin = Math.floor(Math.random()*1000000)
        const adminId = window.localStorage.getItem('adminId')
        const apiurl = `http://${window.location.hostname}:8000/newgamepin`

        axios.post(apiurl, {adminId, newgamepin}).then((res) => {
            console.log("Gamepin sent Sucessfully")
        })

    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-light bg-dark justify-content-center">
                    <h3 className="text-light text-center h2">QUIZ MASTER DASHBOARD</h3>
                    </nav>
                </div>
                <h1 className="text-light">{this.state.gamepin}</h1>
                <button onClick={this.handleNewGameButton} className="btn btn-primary">START NEW GAME</button>
            </div>
        )
    }
}

export default Admindashboard