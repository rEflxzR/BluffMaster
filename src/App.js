import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Landingpage from './Components/Landing Page/Landingpage'
import Playerloginpage from './Components/Login Pages/Playerloginpage'
import Playerdashboard from './Components/Dashboard/Playerdashboard'
import './App.css'

class App extends Component {

    componentDidMount() {
        sessionStorage.setItem('playerLoggedIn', false)
        sessionStorage.setItem('adminLoggedIn', false)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Landingpage} />
                    <Route exact path="/playerlogin" component={Playerloginpage} />
                    <Route exact path="/playerdashboard" component={() => (
                        sessionStorage.getItem('playerLoggedIn') ? (
                            <Playerdashboard />
                        ) : (
                            <Redirect to='/playerlogin' />
                        )
                    )} />
                </Switch>
            </div>
        )
    }
}

export default App;