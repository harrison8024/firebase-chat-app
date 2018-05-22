import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import Nav from './nav';
import {Route} from 'react-router-dom';
import Home from './home';
import Chat from './chat';

const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/chat" component={Chat}/>
        </div>
    </div>
);

export default App;
