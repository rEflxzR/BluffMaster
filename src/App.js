import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Landingpage from './Components/Landing Page/Landingpage'
import Playerloginpage from './Components/Login Pages/Playerloginpage'
import Adminloginpage from './Components/Login Pages/Adminloginpage'
import Playerdashboard from './Components/Dashboard/Playerdashboard'
import Admindashboard from './Components/Dashboard/Admindashborad'
import Questioncard from './Components/Questioncard/Questioncard'
import Gamepincard from './Components/Aux Components/Gamepincard'
import './App.css'


// APP CLASS
class App extends Component {

    render() {
        return (
            <div>
                {/* <Playerdashboard /> */}
                {/* <Admindashboard /> */}
                {/* <Gamepincard /> */}
                <Switch>
                    {/* PUBLICALLY ACCESSIBLE ROUTES */}
                    <Route exact path="/" component={Landingpage} />
                    <Route exact path="/playerlogin" component={Playerloginpage} />
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




// <Switch>
//                     {/* PUBLICALLY ACCESSIBLE ROUTES */}
//                     <Route exact path="/" component={Landingpage} />
//                     <Route exact path="/playerlogin" component={Playerloginpage} />
//                     <Route exact path="/adminlogin" component={Adminloginpage} />

//                     {/* PRIVATE ROUTES ONLY ACCESSIBLE AFTER LOGIN */}
//                     <Route exact path="/playerdashboard" component={() => {
//                         return window.localStorage.getItem('playerLoggedIn') ? (
//                             <Playerdashboard />
//                         ) : (
//                             <Redirect to="/playerlogin" />
//                         )
//                     }} />

//                     <Route exact path="/admindashboard" component={() => {
//                         return window.localStorage.getItem('adminLoggedIn') ? (
//                             <Admindashboard />
//                         ) : (
//                             <Redirect to="/adminlogin" />
//                         )
//                     }} />
//                 </Switch>