import React, { Component } from 'react';
import ErrorPanel from '../ErrorPanel/ErrorPanel';
import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';

class CharacterCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ign: '',
            class: '',
            level: '',
            error: ''
        }
    }

    componentDidMount() {
        // this.handleIgnChange();,
        // this.handleClassChange();
        // this.handleLevelChange();
    }

    // Form Controls
    handleIgnChange = (e) => this.setState({ ign: e.target.value });
    handleClassChange = (e) => this.setState({ class: e.target.value });
    handleLevelChange = (e) => this.setState({ level: e.target.value });

    // Form Submit
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/users/${this.props.user._id}/characters`, {
            ign: this.state.ign,
            user_id: this.props.user._id,
            class: this.state.class,
            level: this.state.level
        }).then(result => {
            if(result.type === 'success') {
                // return <Redirect to='/account' />
                this.props.history.push('/account')
            }

        }).catch(err => {
            // Catch misc errors
            this.setState({
                error: {
                    type: 'server_error',
                    status: 500,
                    message: 'An error has occured, please try again later.'
                }
            })
        })
    }

    render() {
        let errorPanel = (this.state.error) ? <ErrorPanel error={this.state.error} /> : ''
        return (
            <div>
                <h3>Add Character:</h3>
                {errorPanel}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="l-ign">IGN:</label>
                        <input name="l-ign" type='text' value={this.state.ign} onChange={this.handleIgnChange} />
                    </div>
                    <div>
                        <label htmlFor="l-class">Class:</label>
                        <select name="l-class" value={this.state.class} onChange={this.handleClassChange}>

                            <option value="Bow Master">Bow Master</option>
                            <option value="Marksman">Marksman</option>
                            <option value="Arch Mage (I/L)">Arch Mage (I/L)</option>
                            <option value="Arch Mage (F/P)">Arch Mage (F/P)</option>
                            <option value="Bishop">Bishop</option>
                            <option value="Buccaneer">Buccaneer</option>
                            <option value="Corsair">Corsair</option>
                            <option value="Night Lord">Night Lord</option>
                            <option value="Shadower">Shadower</option>
                            <option value="Hero">Hero</option>
                            <option value="Paladin">Paladin</option>
                            <option value="Dark Knight">Dark Knight</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="l-level">Level:</label>
                        <input name="l-level" type='number' min="1" max="200"
                            value={this.state.level} onChange={this.handleLevelChange} />
                    </div>
                    <input type="submit" value='Create!' />
                </form>
            </div>
        )
    }
};

export default CharacterCreateForm;
