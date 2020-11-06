import React, { Component } from 'react'

class Playerdashboard extends Component {

    componentDidMount() {
        document.title = 'Dashboard'
    }

    render() {
        return (
            <div>
                <h1 className="text-light">YOU ARE AUTHENTICATED AS A PLAYER</h1>
            </div>
        )
    }
}

export default Playerdashboard