import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Landingpage from './Components/Landing Page/Landingpage'
import Playerloginpage from './Components/Login Pages/Playerloginpage'
import Adminloginpage from './Components/Login Pages/Adminloginpage'
import Playerdashboard from './Components/Dashboard/Playerdashboard'
import Admindashboard from './Components/Dashboard/Admindashborad'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminLoggedIn: false,
            playerLoggedIn: false
        }

        this.handleLogIn = this.handleLogIn.bind(this)
    }

    componentDidMount() {
        document.title = "APP HOME"
        console.log("APP MOUNTED FIRST TIME")
    }

    handleLogIn() {
        this.setState({ playerLoggedIn: true })
    }

    render() {
        return (
            <div>
                <Switch>
                    {/* PUBLICALLY ACCESSIBLE ROUTES */}
                    <Route exact path="/" component={Landingpage} />
                    <Route exact path="/playerlogin" component={() => {
                        return <Playerloginpage logIn={this.handleLogIn} />
                    }} />
                    <Route exact path="/adminlogin" component={Adminloginpage} />

                    {/* PRIVATE ROUTES ONLY ACCESSIBLE AFTER LOGIN */}
                    <Route exact path="/playerdashboard" component={() => {
                        return window.localStorage.getItem('playerLoggedIn') ? (
                            <Playerdashboard />
                        ) : (
                            <Redirect to="/playerlogin" />
                        )
                    }} />
                    <Route exact path="/admindashboard" component={() => {
                        return window.localStorage.getItem('adminLoggedIn') ? (
                            <Admindashboard />
                        ) : (
                            <Redirect to="/adminlogin" />
                        )
                    }} />
                </Switch>
            </div>
        )
    }
}

export default App;