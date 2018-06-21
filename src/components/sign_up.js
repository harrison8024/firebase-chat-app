import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateInput, createAccount, clearManyInputs} from '../actions';

class SignUp extends Component {

    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUnmount(){
        this.props.clearManyInputs([
            'email', 'username', 'password', 'confirmPassword'
        ]);
    }

    handleSignUp(event){
        event.preventDefault();
        const { email, username, password, confirmPassword } = this.props.form;

        if(password === confirmPassword){
            this.props.createAccount(this.props.form);
            return console.log("account will be created")
        }
        console.log('there is a error');
    }

    handleInputChange(event){
        const {value, name} = event.target;

        this.props.updateInput(name, value);
    }

    render(){
        const { email, username, password, confirmPassword } = this.props.form;
        return (
            <div className="row">
                <h1 className="center">Sign Up</h1>
                <form onSubmit={this.handleSignUp.bind(this)} className="col s8 m6 offset-s2 offset-m3">
                <div className="row">
                    <input value={email} onChange={this.handleInputChange} type="text" placeholder="Email" name="email" autoComplete="off"/>
                </div>
                <div className="row">
                    <input value={username} onChange={this.handleInputChange} type="text" placeholder="Username" name="username" autoComplete="off"/>
                </div>
                <div className="row">
                    <input value={password} onChange={this.handleInputChange} type="password" placeholder="Password" name="password"/>
                </div>
                <div className="row">
                    <input value={confirmPassword} onChange={this.handleInputChange} type="password" placeholder="Confirm Password" name="confirmPassword"/>
                </div>
                <div className="row center">
                    <button className="btn blue">Sign Up</button>
                </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {email, username, password, confirmPassword} = state.input;
    return{
        form: {
            email,
            username,
            password,
            confirmPassword
        }
    };
}

export default connect(mapStateToProps, {updateInput, createAccount, clearManyInputs})(SignUp);