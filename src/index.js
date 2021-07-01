import React from 'react';
import './Resources/css/app.css';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import {firebase} from './firebase';

const App = (props) =>{
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user) =>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})



