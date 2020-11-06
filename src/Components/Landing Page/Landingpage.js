import React, { Component } from 'react'
import axios from 'axios'
import './Landingpage.css'

class Landingpage extends Component {

    async componentDidMount() {
        document.title = "Home | Qumong Us"

        await axios.get('http://localhost:8000/', {
            headers: {
                authorization: window.btoa('taskforce141')
            }
        }).then((res) => {
            console.log(res.data.questions_db[0])
        })
    }

    render() {
        return (
            <div>
                <h1 className="sign">QUMONG US</h1>
                <div className="button">
                    <div className="Player-login mb-2">
                        <a className="btn btn-lg btn-success"><strong>PLAY NOW</strong></a>
                    </div>
                    <div className="Admin-login mt-2">
                        <a className="btn btn-lg btn-primary"><strong>ADMIN LOGIN</strong></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landingpage