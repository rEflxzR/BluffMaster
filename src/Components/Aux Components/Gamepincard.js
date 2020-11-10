import React, { Component } from 'react'

class Gamepincard extends Component {
    constructor(props) {
        super(props)

        this.gameStart = this.gameStart.bind(this)
    }

    gameStart() {
        this.props.gamestart()
    }

    render() {
        return(
            <div>
                <div className="card text-center" style={{width: "21rem"}}>
                <div className="card-body px-0 pb-1">
                    <h1 className="card-title h2 mb-0">CURRENT GAMEPIN</h1>
                    <h3 className="mb-3">{this.props.gamepin}</h3>
                    <button onClick={this.gameStart} className="btn btn-lg btn-success">START GAME</button>
                </div>
                </div>
            </div>
        )
    }
}

export default Gamepincard