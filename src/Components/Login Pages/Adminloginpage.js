import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Adminloginpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            adminauthorized: false
        }
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        document.title = 'Login | Admin'
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    async handleSubmitClick(evt) {
        evt.preventDefault()
        const {username, password} = this.state
        const apiurl = `http://${window.location.hostname}:8000/adminlogin`

        await axios.post(apiurl, {username, password}).then((res) => {
            if(!res.data) {
                alert('STRANGERS ARE NOT WELCOME!!!!!!!!')
            }
            if(res.data) {
                window.localStorage.setItem('adminLoggedIn', true)
                this.setState({ adminauthorized: true })
            }
        })
    }

    render() {
        if(this.state.adminauthorized) {
            return <Redirect to='/admindashboard' />
        }
        else {
            return (
                <div className="d-flex flex-column" style={{ height: '100vh' }}>
                    <p className="text-center h2" style={{color: 'white', marginTop: '30vh'}}>QUIZ MASTER LOGIN</p>
                    <div className="d-flex justify-content-center mt-4">
                        <form onSubmit={this.handleSubmitClick}>
                            <input className="mr-1" onChange={this.handleChange} style={{ height: '40px' }} id="username" type="text" name="username" placeholder="Username" required />
                            <input className="ml-1" onChange={this.handleChange} style={{ height: '40px' }} id="password" type="password" name="password" placeholder="Password" required />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-block btn-lg btn-success mt-2"><strong>LOGIN</strong></button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default Adminloginpage