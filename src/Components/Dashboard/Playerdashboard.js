import React, { Component } from 'react'

class Playerdashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = 'Dashboard | Player'
    }

    componentWillUnmount() {
        console.log("COMPONENT UNMOUNTED")
        window.localStorage.clear()
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