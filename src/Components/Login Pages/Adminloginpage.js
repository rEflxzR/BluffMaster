import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Adminloginpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            authorized: false
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

        await axios.post('http://localhost:8000/adminlogin', {username, password}).then((res) => {
            this.setState({ authorized: res.data })
            if(!res.data) {
                alert('STRANGERS ARE NOT WELCOME!!!!!!!!')
            }
        })
    }

    render() {
        if(this.state.authorized) {
            setTimeout(() => {
                return <Redirect to='/admindashboard' />
            }, 2000);
        }
        else {
            return (
                <div className="d-flex flex-column" style={{ height: '100vh' }}>
                    <p className="text-center h2" style={{color: 'white', marginTop: '30vh'}}>QUIZ MASTER LOGIN</p>
                    <div className="d-flex justify-content-center mt-4">
                        <form onSubmit={this.handleSubmitClick}>
                            <input onChange={this.handleChange} style={{ height: '40px' }} id="username" type="text" name="username" placeholder="Username" required />
                            <input onChange={this.handleChange} style={{ height: '40px' }} id="password" type="text" name="password" placeholder="Password" required />
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