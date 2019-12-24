import React, { Component } from 'react'

import '../style/dashboard.css'

import AddPassword from './addPassword'
import ViewAllPassword from './viewAllPasswords'
import Login from '../auth/login'

class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            allPasswords : [],
            email : "",
            logout : false,
            totlaNumPasswords : 0
        }
    }

    // get's all the password from api 
    componentDidMount(){
        const email = this.props.userInfo.emailId
        fetch(`https://password-generator-api-s2.herokuapp.com/get-all-passwords/${email}`)
            .then(res => res.json())
            .then(password => this.setState({
                allPasswords : [...password],
                email : email,
                totlaNumPasswords : password.length
            }))
            .then(console.log('something went wrong!'))
    }

    // add new password 
    addNewPassword = ( userEmail,appName ) => {
        const newObj = {"email":userEmail,"app_name":appName}
        fetch("https://password-generator-api-s2.herokuapp.com/add-password",{
            method : 'POST',
            headers : { 'content-type' : 'application/json' },
            body : JSON.stringify( newObj )
        })     
            .then(res => res.json())
            .then(passObj => this.updateState(passObj))
            .catch(console.log('something went wrong!'))
    }

    // update the state after the adding to the server 
    updateState = (passObj) => {
        this.setState({
            allPasswords : [...this.state.allPasswords, passObj] ,
            totlaNumPasswords : this.state.allPasswords.length + 1
        })
    }

    // all funcction's
    deletePassword = ( event ) => {
        const delKey = event.target.id
        console.log(delKey)
        fetch(`https://password-generator-api-s2.herokuapp.com/delete-password/${ delKey }`)
            .then(res => res.json())
            .then(delPass => this.checkPasswordSuccess(delPass,delKey)) 
    }

    // checks the deleted password status 
    checkPasswordSuccess = ( delPass,delKey ) => {
        if (delPass.status === 200){
            this.updateStateAfterDelete(delKey)
        }else{
            console.log("somthing went wrong")
        }
    }

    // update the state after deleting 
    updateStateAfterDelete = ( delKey ) => {
        console.log(this.state.allPasswords)
        const newState = this.state.allPasswords.filter(password => password.id != delKey )
        this.setState({
            allPasswords : newState,
            totlaNumPasswords : newState.length
        })
        console.log('password deleted successfullty')
    } 

    // logout user 
    logout = () => {
        const logoutEmail = this.state.email
        const logoutObj = {"email":logoutEmail}
        if (this.state.logout === false){
            fetch(`https://passman-atuh-api-v1.herokuapp.com/api/auth/logout`,{
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify(logoutObj)
            })
                .then(res => res.json())
                .then(resData => this.logoutUser(resData))
        }
    }

    // update the logout state 
    logoutUser = (data) => {
        if (data && data.status === 400){
            this.setState({
                logout : true 
            })
            alert('logged out successfully')
        }
    }

    // userprofile 
    userProfile = () => {
        alert('new feature coming soon!')
    }

    render(){
        if (this.state.logout === false){
            return (
                <div className="dash-bg">
                    <h1 className="dash-header">DashBoard 
                        <button className="logout" onClick={this.logout}>
                            logout
                        </button>
                        <button className="profile" onClick={this.userProfile}>
                            user profile
                        </button>
                        <span className="total">
                            total password: {this.state.totlaNumPasswords}
                        </span>
                    </h1>
                    <hr className="line-top"/>
                    <AddPassword addNewPassword={this.addNewPassword}  
                    userEmail={this.state.email}/>
                    <hr className="line-down"/>
                    <ViewAllPassword deletePassword={this.deletePassword}
                    allPasswords={this.state.allPasswords} />
                </div>
            )
        }else{
            return (
                <Login />
            )
        }
    }
}


export default DashBoard