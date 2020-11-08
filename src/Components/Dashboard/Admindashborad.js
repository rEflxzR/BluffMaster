import React, { Component } from 'react'

class Admindashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = 'Dashboard | Admin'
    }

    componentWillUnmount() {
        window.localStorage.removeItem('adminLoggedIn')
    }

    render() {
        return (
            <div>
                <h1 className="text-light">YOU ARE AUTHENTICATED AS A QUIZ MASTER</h1>
            </div>
        )
    }
}

export default Admindashboard