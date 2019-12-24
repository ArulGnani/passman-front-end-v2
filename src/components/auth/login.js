import React, { Component } from 'react'

// css 
import '../style/login.css'

import DashBoard from '../dashorad/dashBoard'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            password  : "",
            login : false,
            userInfo : {}
        }
    }

    // update state val according to input field
    handelChange = (event) => {
        this.setState({
            [ event.target.name ] : event.target.value
        }) 
    }

    // hit the auth server 
    login = () => {
        if ( this.state.email === "" || this.state.password === ""){
            alert("all fields are needed")
        }else {
            const validateEmail = this.checkEmail(this.state.email)
            if ( !validateEmail ){
                alert("enter an valid email id!")
            }else {
                const email = this.state.email
                const password = this.state.password
                this.fetchUserDetails(email, password)
            }
        }
        this.resetInputFields()
    }

    // fetch the user detail from auth api 
    fetchUserDetails = (email, password) => {
        const loginCred = {"email" : email, "password":password}
        fetch("https://passman-atuh-api-v1.herokuapp.com/api/auth/login",{
            method : "POST",
            headers : { 'content-type' : 'application/json' },
            body : JSON.stringify(loginCred)
        })
            .then(res => res.json())
            .then(info => this.validateLogin(info))
    }
    
    // check login 
    validateLogin = (userInfo) => {
        if (userInfo.status === 201){
            console.log('info')
            if (userInfo.status === 201){
            this.setState({
                login : true,
                userInfo : userInfo
            })}
            if (userInfo.status === 301){
                this.setState({
                    login : true,
                    userInfo : userInfo
                })
            }
        }else{  
            alert(userInfo.desc)
        }
    }

    // validate email id 
    checkEmail = (email) => {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const res = emailReg.test(String(email).toLowerCase())
        return res 
    }

    resetInputFields = () => {
        this.setState({
            email : "",
            password : ""
        })
    }

    render() {
        if (this.state.login === false) {
            return (
                <div className="login-bg">
                    <h3 className="login-header">
                        <b>login page</b>
                    </h3>
                    <hr className="line"/>
                    <input placeholder="email" onChange={this.handelChange}
                    type="email" name="email" value={this.state.email}
                    autoComplete="true" className="login-field"/>
                    <br />
                    <input placeholder="password" onChange={this.handelChange}
                    type="password" name="password" value={this.state.password}
                    className="login-field"/>
                    <br />
                    <button onClick={this.login} className="login-btn">login</button>
                    <hr className="line-bottom"/>
                    <div>
                        <p className="sigin-login">new user 
                            <button onClick={this.props.changeRenderPage} 
                            className="sigin-login-btn">
                            create new account </button>
                        </p>
                    </div>
                </div>
            )
        }else {
            return (
                <div>
                    <DashBoard userInfo={this.state.userInfo}/>
                </div>
            )
        }
    }
}

export default Login