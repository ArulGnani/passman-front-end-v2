import React, { Component } from 'react'

class AppPassword extends Component {
    constructor( props){
        super( props )
        this.state = {
            appName : ''
        }
    }

    // send the state to parent element 
    addPassword = ( event ) => {
        event.preventDefault()
        const userEmail = this.props.userEmail
        const appName = this.state.appName
        console.log('add',userEmail,appName)
        this.props.addNewPassword(userEmail,appName)
        this.resetInpuValue()
        console.log('added!')
    }

    // update the local state 
    handelChange = ( event ) => {
        this.setState({
            [ event.target.name ] : event.target.value 
        })
    }

    // clean's the input field 
    resetInpuValue = () => {
        this.setState({
            email : '',
            appName : ''
        })
    }

    render() {
        return (
            <div style={addBody}>
            <h1>add password</h1>
                <form className="form">
                    <input type="text" placeholder="app name" 
                    value={ this.state.appName } onChange={ this.handelChange }
                    name="appName" 
                    className="frm-input"
                    style={inputField}/>
                    <br />
                    <button onClick={ this.addPassword } 
                    className="btn"
                    style={addBtn}>
                        generate password
                    </button>
                </form>    
            </div>
        )
    }
}

// style 
const addBody = {
    marginTop : '10px',
    marginBottom : '20px'
}

const inputField = {
    padding : '10px 20px',
    marginBottom : '10px',
    border : '2px solid black',
    fontSize : '15px'
}

const addBtn = {
    border : '2px solid black',
    padding : '10px',
    background : 'black',
    color : 'white',
}

export default AppPassword