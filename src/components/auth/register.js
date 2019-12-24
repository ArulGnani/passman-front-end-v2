import React, { Component } from 'react'

//import DashBoard from '../dashorad/dashBoard'
import Login from './login'
import SignIn from './signin'

class Regester extends Component {

    constructor( props ){
        super( props )
        this.state = {
            login : false,
            dashBoard : false,
            userInfo : {}
        }
    }

    componentWillReceiveProps = ( props ) => {
        this.setState({
            login : props.state
        })
    }

    updateStateAterLogin = (userData) => {
        this.setState({
            userInfo : userData
        })
    }

    changeRenderState = () => {
        this.setState((oldState) => ({
            login : !oldState.login
        }))
    }

    render() {
        if ( this.state.login === true ){
            return(
                <Login updateState={this.updateStateAterLogin} 
                changeRenderState={this.changeRenderState}
                userInfo={this.state.userInfo}/>
            )
        }else {
            return (
                <SignIn changeRenderState={this.changeRenderState}/>
            )
        }
    }
}
export default Regester