import React, { Component } from 'react';
import axios from 'axios';
import options from './options';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidParticipants: [],
            // allUsers: [],
            allRaidGroups: [],
            allCharacters: [],
            currentlySelectedCharacter: "",
            boss: null,
            date: null
        }
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        // Get list of raid groups
        Promise.all([axios.get('/api/raidgroups'), axios.get('/api/users')])
            .then(responses => {
                let raidGroups = responses[0].data.groups;
                let users = responses[1].data.users;

                let allCharacters = [];
                // get every character from every user into arr
                users.forEach(user => {
                    user.characters.forEach(character => {
                        allCharacters.push(character);
                    })
                })

                this.setState({
                    allRaidGroups: raidGroups,
                    allCharacters: allCharacters,
                    currentlySelectedCharacter: allCharacters[0],
                    boss: this.props.bossName
                })
            }).catch(err => {
                //Failure to get data
                console.log(err);
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
        console.log(this);
        let title = (this.props.bossName) ? <h1>{this.props.bossName}</h1> : <h1>Custom Boss</h1>
        let bossSelector = (!this.props.bossName) ?
            <>
                <label htmlFor='raid-type'>Boss: </label>
                <select name="raid-type" value={this.state.raidType} onChange={this.handleRaidTypeChange}>
                    {options.bossOptions().map((op, key) => (
                        <option key={key} value={op}>{op}</option>
                    ))}
                </select>
            </> : <h3>{this.state.boss}</h3>;
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