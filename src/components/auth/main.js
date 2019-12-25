import React, { Component } from 'react'

import '../style/register.css'

import Register from './register'

import Login from './login'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            click : false,
            login : false
        }
    }

    handelChange = () => {
        this.setState({
            click : true
        })
    }

    changeToLogin = () => {
        this.setState({
            login : true
        })
    }

    render() {
        if (this.state.login === true){
            return ( <Login /> )
        }
        if (this.state.click === false){
            return (
                <div className="main">
                    <div>
                        <button onClick={this.handelChange} value="signin"
                        className="signin">
                            sign up
                        </button>
                    </div>
                    <hr id="line"/>
                    <div>
                        <button onClick={this.changeToLogin} value="login"
                        className="login">
                            login 
                        </button>
                    </div>
                </div>
            )
        }
        if (this.state.click === true){
            return (
            <div className={this.state.front === true ? "reg" : ""}>
                        <Register state={this.state.front}/>
            </div>
            )
        }
     }
}
export default Main