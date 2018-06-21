import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateInput, signInUser, clearManyInputs} from '../actions';

class SignIn extends Component {

    constructor(props){
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUnmount(){
        this.props.clearManyInputs([
            'email', 'password'
        ]);
    }

    handleSignIn(event){
        event.preventDefault();
        
        const {email, password} = this.props.form;
        
        console.log('user info:', email, password);

        this.props.signInUser({email, password});
    }

    handleInputChange(event){
        const {value, name} = event.target;

        this.props.updateInput(name, value);
    }

    render(){
        const { email, password } = this.props.form;
        return (
            <div className="row">
                <h1 className="center">Sign In</h1>
                <form onSubmit={this.handleSignIn.bind(this)} className="col s8 m6 offset-s2 offset-m3">
                <div className="row">
                    <input value={email} onChange={this.handleInputChange} type="text" placeholder="Email" name="email" autoComplete="off"/>
                </div>
                <div className="row">
                    <input value={password} onChange={this.handleInputChange} type="password" placeholder="Password" name="password"/>
                </div>
                <div className="row center">
                    <button className="btn blue">Sign In</button>
                </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {email, password} = state.input;
    return{
        form: {
            email,
            password,
        }
    };
}

export default connect(mapStateToProps, {updateInput, signInUser, clearManyInputs})(SignIn);