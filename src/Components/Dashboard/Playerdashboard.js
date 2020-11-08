import React, { Component } from 'react'

class Playerdashboard extends Component {

    constructor(props) {
        super(props)
        console.log(window.history.state.key)

    }

    componentDidMount() {
        document.title = 'Dashboard'
    }

    componentWillUnmount() {
        window.localStorage.removeItem('playerLoggedIn')
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