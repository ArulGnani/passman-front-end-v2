import React, { Component } from 'react'


class ViewAllPasswords extends Component {
    constructor( props ){
        super(props)
        this.state = {
            passwords : []
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            passwords : props.allPasswords
        })
    }

    render() {  
        this.state.passwords.reverse()
        const psd = this.state.passwords.map((password,key) => {
                    return (
                        <div key={key} id={password.id} style={passwordBox}>
                            <div>
                                <p style={appName}>
                                    <b>{ password.app_name }</b> 
                                </p>
                            </div>
                            <div>
                                <p>
                                    <small style={smallPassword}>password:</small>
                                    <br/>
                                    <b style={passWord}>{ password.app_password }</b>
                                </p>
                            </div>
                            <button id={password.id} 
                            onClick={(event)=>this.props.deletePassword(event)}
                            style={btn}>
                                delete
                            </button>
                        </div>
                    )
                })
        return (
            <div className="all-passwords">
                <div>
                    <h1 style={viewHeader}>
                        view all passwords 
                    </h1>
                </div>
                <div style={passBox}>
                    { psd}
                </div>
            </div>
        )
    }
}

const passWord = {
    fontSize : '25px',
    fontWeight : 800,
    marginBottom : '15px' 
}

const smallPassword = {
    fontWeight : 400,
    marginBottom : '10px'
}

const passwordBox = {
    border : '2px soild black',
    marginTop : '10px',
    padding : '15px',
    marginBottom : '10px'
}

const viewHeader = {
    marginBottom : '10px',
    marginBottom : '5px'
}

const btn = {
    background : 'black',
    color : 'white',
    padding : '5px 20px',
    border : 'none',
    marginTop : '10px'
}

const passBox = {
    border : '2px soild black'
}

const appName = {
    fontWeight : '800',
    lineHeight : '2px',
    fontSize : '20px',
    marginBottom : '10px'
}


export default ViewAllPasswords