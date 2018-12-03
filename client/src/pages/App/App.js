import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import NoMatchPage from '../NoMatchPage/NoMatchPage';
import tokenService from '../../utils/tokenService';
import NavBar from '../../components/NavBar/NavBar'
import './App.css';
import AccountPage from '../AccountPage/AccountPage';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            user: null,
            error: null
        };
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        this.setUserStateFromLocalToken();
    }

    render() {
        var nav = <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' render={() =>
                            <MainPage 
                                NavBar={nav}
                            />
                        } />
                        <Route exact path='/login' render={() =>
                            <LoginPage
                                NavBar={nav}
                                handleLogin={this.handleLoginOrSignup}
                            />
                        } />
                        <Route exact path='/signup' render={() =>
                            <SignupPage
                                NavBar={nav}
                                handleSignup={this.handleLoginOrSignup}
                            />
                        } />
                        <Route path='/account' render={() => (
                            this.state.user ?
                                <AccountPage 
                                    NavBar={nav}
                                    user={this.state.user}
                                /> :
                                <Redirect to='/login' />
                        )} />
                        <Route exact path='/404' render={() => 
                            <NoMatchPage 
                                NavBar={nav}
                            /> 
                        }/>
                        <Route render={() => <Redirect to='/404' />} />
                    </Switch>
                </Router>
            </div>
        );
    }

    /*--- Callback Functions ---*/
    handleSomeClick = (e) => {
        //Hello
    }
    handleLoginOrSignup = (data) => {
        // Try to set token to local storage
        if (tokenService.setToken(data.token)) {
            // Lift token to state
            this.setState({
                token: data.token,
                user: data.user
            })
        }
    }

    setUserStateFromLocalToken = async () => {
        try {
            let result = await tokenService.authMeFromLocalToken();
            if(result) {
                // Token found; lift to state
                this.setState({
                    token: result.token,
                    user: result.user
                });
            } else {
                // No token found; reset state
                this.setState({
                    token: '',
                    user: null
                });
            }
        } catch(err) {
            // Authentication challenge failed; reset state + include error msg
            console.log("auth challenge failed");
            this.setState({
                token: '',
                user: null,
                error: err
            })
        }
    }
    handleLogout = () => {
        tokenService.removeToken();
        // Remove the user info from the state
        this.setState({
            token: '',
            user: null
        })
    }
    /*--- Helper Methods ---*/


}

export default App;