import React, { Component } from 'react'

import '../style/sigin.css'
import Login from './login'

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : "",
            email : "",
            password : "",
            confromPassword : "",
            login : false,
            signIn : false
        }
    }

    handelChange = (event) => {
        this.setState({
            [ event.target.name ] : event.target.value
        })
    }

    // craetea an new account
    signIn = () => {
        const validate = this.validateUserInfo(this.state)
        if (validate){
            this.addNewUser(this.state)
        }else{
            console.log('not validated')
        }
    }

    // add new user after validating
    addNewUser = (userInfo) => {
        const data = {"user_name":userInfo.name,"email":userInfo.email,
                      "password":userInfo.confromPassword,"is_login":false}
        fetch("https://passman-atuh-api-v1.herokuapp.com/api/auth/register",{
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => this.serverValidate(data))
    }

    // change sigin state to login state 
    changeToLogin = () => {
        this.setState({
            signIn : true
        })
    }

    // validate from the server 
    serverValidate = (userInfo) => {
        if (userInfo.status === 200){
            console.log(userInfo);
            this.changeToLogin()
            alert(userInfo.desc) 
        }else {
            alert(userInfo.desc)
        }
    }

    // validate user name 
    validateUserInfo = (info) => {
        const checkEmptyField = this.checkEmptyField(info)
        const validatedName = this.validateName(info.name)
        const validatedEmail = this.validateEmail(info.email)
        const validatedPassword = this.validatePassword(info.password,info.confromPassword)
        if (checkEmptyField && validatedName && 
            validatedEmail && validatedPassword){
            return true
        }else{
            return false
        }
    }

    // check for empty fields in the form
    checkEmptyField = (info) => {
        if (info.name === "" || info.email === "" || 
            info.password === "" || info.confromPassword === ""){
            alert("all fields are nedded!")
            return false
        }else {
            return true
        }
    }

    // validate user name 
    validateName = (name) => {
        if (name.length < 4){
            alert("user name is too sort! minimum 6 character long")
            return false
        }else {
            return true
        }
    }

    // validate email 
    validateEmail = (email) => {
        if (email.length < 5) {
            alert("email id is too small minimum it should be 8 character long")
            return false
        }else {
            const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const res = emailReg.test(String(email).toLowerCase())
            if (res === true){
                return true
            } 
            else{
                return false
            }
        }
    }
    
    // validate password 
    validatePassword = (password,confromPassword) => {
        if(String(password) === String(confromPassword)){
            return true
        }else {
            alert("password did not match")
            return false
        }
    }

    //reset all fields
    resetInputField = () => {
        this.setState({
            name : "",
            email : "",
            password : "",
            confromPassword : ""
        })
    }

    render() {
        if (this.state.signIn === false){
        return (
            <div className="signin-bg">
                <h3 className="sign-header"><b>sign in page</b></h3>
                <hr className="sign-line"/>
                <div className="sign-in-form">
                    <input name="name" placeholder="name" onChange={this.handelChange}
                    value={this.state.name} type="text" className="fields"/>
                    <br/>
                    <input name="email" placeholder="email" onChange={this.handelChange}
                    value={this.state.email} type="email" className="fields"/>
                    <br/>
                    <input name="password" placeholder="password" onChange={this.handelChange}
                    value={this.state.password} type="password" className="fields"/>
                    <br/>
                    <input name="confromPassword" placeholder="conform password" onChange={this.handelChange}
                    value={this.state.confromPassword} type="password" className="fields"/>
                    <br/>
                    <button onClick={this.signIn} className="sign-btn">sigin in</button>
                </div>
                <hr className="sign-login-line"/>
                <div className="sign-login">
                    already have an account
                    <button onClick={this.props.changeRenderState} 
                    className="sigin-login-btn">
                        login 
                    </button>
                </div>
            </div>
        )} else {
            return( <Login />)
        }
    }
}


export default SignIn