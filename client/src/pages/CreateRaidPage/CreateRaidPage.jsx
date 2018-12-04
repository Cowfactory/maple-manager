import React, { Component } from 'react';
import axios from 'axios';
import options from './options';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidGroups: [],
            allParticipants: [],
            boss: null,
            date: null
        }
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        // Get list of raid groups
        axios.get('/api/raidgroups')
            .then(response => {
                if (response.data.type !== 'success') {
                    // failure
                } else {
                    this.setState({
                        raidGroups: response.data.groups
                    })
                }
            })

        // Get list of users
        axios.get('/api/users')
            .then(response => {
                console.log(response.data.users);
                if (!response) {
                    console.log("failed to get users")
                    // failure
                } else {
                    this.setState({
                        allParticipants: response.data.users
                    })
                }
            })
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {

    }
    
    handleDateChange = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    handleRaidTypeChange = (e) => {
        this.setState({
            raidType: e.target.value
        })
    }

    handleAddParticipant = (e) => {

    }

    render() {
        let title = (this.props.bossName) ? <h1>{this.props.bossName}</h1> : <h1>Custom Boss</h1>
        let bossSelector = (!this.props.bossName) ?
            <>
                <label htmlFor='raid-type'>Boss: </label>
                <select name="raid-type" value={this.state.raidType} onChange={this.handleRaidTypeChange}>
                    {options.bossOptions().map((op, key) => (
                        <option key={key} value={op}>{op}</option>
                    ))}
                </select>
            </> : "";
        let lootSelector = 
            <>
                <label htmlFor="loot"></label>
                <select>

                </select>
            </>;
        let participantSelector = 
            <>
                <label htmlFor="participants"></label>
                <select name="participants">
                    {this.state.allParticipants.map((participant, idx) => (
                        <option key={idx} value={participant}>{participant.name}</option>
                    ))}
                </select>
            </>


        return (
            <>
                {this.props.NavBar}
                {title}
                <div className={styles.CreateRaidPage}>
                    <div className={styles.left}>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                {bossSelector}
                            </div>
                            <input type="submit" value='Submit' />
                        </form>
                    </div>
                    <div className={styles.right}>
                        <Calendar handleChange={this.handleDateChange} />
                        {participantSelector}
                        <button type="button" value='Add Participant' onClick={this.handleAddParticipant} />
                    </div>
                </div>
            </>
        )
    }
}

export default CreateRaidPage;