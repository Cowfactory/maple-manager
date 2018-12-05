import React, { Component } from 'react';
import styles from './RaidParticipationPanel.module.css';
import axios from 'axios';

class RaidParticipationPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raidParticipants: [],
            raidOrganizer: null,
            allCharacters: [],
            currentChar: '',
            _selectValue: '',
            _select2Value: ''
        }
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => {
                let users = response.data.users;
                let allCharacters = [];
                // get every character from every user into arr
                users.forEach(user => {
                    user.characters.forEach(character => {
                        allCharacters.push(character);
                    })
                })
                this.setState({
                    allCharacters: allCharacters,
                    currentChar: allCharacters[0],
                    raidOrganizer: allCharacters[0]
                })
            })
            .catch(err => {
                console.log(err);
            })

    }

    handleSelectChange = (e) => {
        this.setState({
            currentChar: JSON.parse(e.target.value),
            _selectValue: e.target.value
        })
    }

    handleOrganizerChange = (e) => {
        this.setState({
            raidOrganizer: JSON.parse(e.target.value),
            _select2Value: e.target.value
        })
    }

    handleAddParticipant = (e) => {
        let participantArr = this.state.raidParticipants;
        let currentChar = this.state.currentChar;

        let duplicateCharEntry = participantArr.find((participant) => {
            return participant.ign === currentChar.ign
        })

        // Add participant to list if not duplicate
        if (!duplicateCharEntry)
            participantArr.push(currentChar)
        else {
            // TODO: toast notification - duplicate character
        }

        this.setState({ raidParticipants: participantArr });
        this.props.liftParticipantsToState(participantArr);
    }

    handleAddOrganizer = (e) => {
        let participants = this.state.allCharacters;

        if(this.state._select2Value) {
            // if there is a user selection
            let organizer = JSON.parse(this.state._select2Value);
            this.setState({ raidOrganizer: organizer });
            this.props.liftOrganizerToState(organizer);
        } else {
            // if user has made no selection
            let organizer = participants[0];
            this.setState({ raidOrganizer: organizer })
            this.props.liftOrganizerToState(organizer);
        }
    }
    

    render() {
        let participantSelector =
            <div className={styles.participantSelector}>
                <div>
                    <label htmlFor="participants">Add by IGN:</label>
                    <select name="participants"
                        onChange={this.handleSelectChange}
                        value={this.state._selectValue}>

                        {this.state.allCharacters.map((character, idx) => (
                            <option key={idx} value={JSON.stringify(character)}>
                                {character.ign} - {character.class} | {character.level}
                            </option>
                        ))}
                    </select>
                    <button type="button" value='Add Participant' onClick={this.handleAddParticipant}>Add Participant</button>
                </div>
                <div>
                    <label htmlFor="participants">Organizer:</label>
                    <select name="organizer"
                        onChange={this.handleOrganizerChange}
                        value={this.state._select2Value}>

                        {this.state.allCharacters.map((character, idx) => (
                            <option key={idx} value={JSON.stringify(character)}>
                                {character.ign} - {character.class} | {character.level}
                            </option>
                        ))}
                    </select>
                    <button type="button" value='Add Organizer' onClick={this.handleAddOrganizer}>Add Organizer</button>
                </div>
            </div>


        // let participantList =
        //     <div className={styles.participantList}>
        //         {this.state.raidParticipants.map((participant, idx) => (
        //             <div key={idx}>{participant.ign} - {participant.class} | {participant.level}</div>
        //         ))}
        //     </div>

        return (
            <div className={styles.RaidParticipation}>
                {/* {participantList} */}
                {participantSelector}
            </div>
        )
    }
}

export default RaidParticipationPanel;