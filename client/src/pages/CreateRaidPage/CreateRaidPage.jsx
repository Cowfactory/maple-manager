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
            raidParticipants: [],
            // allUsers: [],
            allCharacters: [],
            currentlySelectedCharacter: "",
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
                if (!response) {
                    console.log("failed to get users")
                    // failure
                } else {
                    let allCharacters = [];
                    // get every character from every user into arr
                    response.data.users.forEach(user => {
                        user.characters.forEach(char => {
                            allCharacters.push(char);
                        })
                    })
                    // let allUsers = response.data.users;
                    let currentlySelectedCharacter = allCharacters[0];
                    this.setState({
                        allCharacters: allCharacters,
                        currentlySelectedCharacter: currentlySelectedCharacter
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
    handleCurrentlySelectedCharacterChange = (e) => {
        this.setState({ currentlySelectedCharacter: JSON.parse(e.target.value) })
    }

    handleAddParticipant = (e) => {
        let participantArr = this.state.raidParticipants;
        participantArr.push(this.state.currentlySelectedCharacter);
        
        this.setState({ raidParticipants: participantArr });
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
        // let lootSelector = 
        //     <>
        //         <label htmlFor="loot"></label>
        //         <select>

        //         </select>
        //     </>;
        let participantSelector = 
            <div className={styles.participantSelector}>
                <label htmlFor="participants"></label>
                <select name="participants" 
                    onChange={this.handleCurrentlySelectedCharacterChange} 
                    value={this.state.currentlySelectedCharacter}>

                    {this.state.allCharacters.map((participant, idx) => (
                        <option key={idx} value={JSON.stringify(participant)}>
                            {participant.ign} - {participant.class} | {participant.level}
                        </option>
                    ))}

                </select>
                <button type="button" value='Add Participant' onClick={this.handleAddParticipant}>Add Participant</button>
            </div>


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
                        <span>Date:</span>
                        <div className={styles.calendar}>
                            <Calendar handleChange={this.handleDateChange} /><br /><br />
                        </div>
                        <span>Participants:</span>
                        {participantSelector}
                    </div>
                </div>
            </>
        )
    }
}

export default CreateRaidPage;