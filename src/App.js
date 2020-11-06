import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Landingpage from './Components/Landing Page/Landingpage'
import Playerloginpage from './Components/Login Pages/Playerloginpage'
import './App.css'

class App extends Component {
    render() {
        return (
            <div>
                {/* <Playerloginpage /> */}
                <Switch>
                    <Route exact path="/" component={Landingpage} />
                </Switch>
            </div>
        )
    }
}

export default App;