import React, { Component } from 'react';
import CharacterCreateForm from '../../components/CharacterCreateForm/CharacterCreateForm.jsx';
import CharacterList from '../../components/CharacterList/CharacterList';
import axios from 'axios';

class AccountPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: []
        }
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.user._id}/characters`)
            .then(characters => {
                this.setState({ characters })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className='AccountPage'>
                {this.props.NavBar}
                Account Page
                <div className='left'>
                    <CharacterList 
                        user={this.props.user}
                    />
                </div>
                <div className='right'>
                    <CharacterCreateForm 
                        user={this.props.user}
                    />
                </div>
            </div>
        );
    }
};

export default AccountPage;