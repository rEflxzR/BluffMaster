import React, { Component } from 'react'

class Playerloginpage extends Component {

    render() {
        return (
            <div>
                <h1>PLAYER ENTRY</h1>
                <form>
                    <label for="gamepin">Gamepin</label>
                    <input id="gamepin" type="text" name="gamepin" placeholder="********" required />
                    <button className="btn btn-lg btn-success">Submit</button>
                </form>
            </div>
        )
    }
}