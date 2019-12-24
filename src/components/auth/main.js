import React, { Component } from 'react'

import '../style/register.css'

import Register from './register'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            click : false
        }
    }

    handelChange = (event) => {
        this.setState({
            click : true
        })
    }

    render() {
        if (this.state.click === false){
            return (
                <div className="main">
                    <div>
                        <button onClick={this.handelChange} value="signin"
                        className="signin">
                            sign in
                        </button>
                    </div>
                    <hr id="line"/>
                    <div>
                        <button onClick={this.handelChange} value="login"
                        className="login">
                            login 
                        </button>
                    </div>
                </div>
            )
        }else{
            return (
            <div className={this.state.front === true ? "reg" : ""}>
                        <Register state={this.state.front}/>
            </div>
            )
        }
    }
}
export default Main