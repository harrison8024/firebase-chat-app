import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutUser} from '../actions';

const Nav = props => {
    const {auth, username} =props.user;
    const navStyle = {
        padding: '0 10px'
    };

    const renderLinks = () => {
        
        if(auth){
            return (
                <Fragment>
                    <li>
                        <Link to="/chat-rooms">Chat Rooms</Link>
                    </li>
                    <li>
                        <Link to="/create-room">Create Chat Room</Link>
                    </li>
                    <li>
                        <button className="btn grey" onClick={props.signOutUser}>Sign Out</button>
                    </li>
                </Fragment>   
            );
        }
        return (
            <Fragment>
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                    <Link to="/sign-in">Sign In</Link>
                </li>
            </Fragment> 
        )
    }

    return (
        <nav className="blue darken-2" style={navStyle}>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">Chat box</Link>
                <ul className="right">
                    <li>
                        {username ? `Hello ${username}`: ''}
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {renderLinks()}
                </ul>
            </div>
        </nav>
    );
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {signOutUser})(Nav);