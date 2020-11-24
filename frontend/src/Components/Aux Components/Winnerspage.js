import React, { Component } from 'react'
import Confetti from 'react-confetti'

class Winnerspage extends Component {

    render() {
        return(
            <div style={{ width: '100%' }}>
                <h1 className="text-center mt-5" style={{ color: '#FFD700', fontSize: '6rem' }}>FINAL RESULTS</h1>
                <div>
                    <p className="text-center text-light mt-5 mb-0" style={{ fontSize: '4.5rem' }}>1st Place</p>
                    <p className="text-center text-light" style={{ fontSize: '3rem' }}>Team {this.props.finalResult[0][2]}</p>
                </div>
                <div>
                    <p className="text-center text-light mt-5 mb-0" style={{ fontSize: '3.5rem' }}>2nd Place</p>
                    <p className="text-center text-light" style={{ fontSize: '2.5rem' }}>Team {this.props.finalResult[1][2]}</p>
                </div>
                <div>
                    <p className="text-center text-light mt-5 mb-0" style={{ fontSize: '3.5rem' }}>3rd Place</p>
                    <p className="text-center text-light" style={{ fontSize: '2.5rem' }}>Team {this.props.finalResult[2][2]}</p>
                </div>
                <Confetti initialVelocityY={4, 7} gravity={0.08} width={window.innerWidth} height={window.innerHeight} />
            </div>
        )
    }
}

export default Winnerspage