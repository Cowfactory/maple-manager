import React, { Component } from 'react';
import axios from 'axios';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';
import RaidParticipationPanel from '../../components/RaidParticipationPanel/RaidParticipationPanel';
import RaidGroupsPanel from '../../components/RaidGroupsPanel/RaidGroupsPanel';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidParticipants: [],
            activeGroup: null,
            loot: [],
            boss: this.props.bossName || 'Zakum',
            date: null,
            organizer: null
        }
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {
        let data = {
            participants: this.state.raidParticipants.filter(p => p._id),
            group: this.state.activeGroup,
            loot: this.state.loot,
            boss: this.state.boss,
            date: this.state.date
        };

        axios.post('/api/bossruns', data)
            .then(response => { console.log(response) })
            .catch(err => { console.log(err) })
    }

    handleDateChange = (date) => { this.setState({ date: date }) }
    handleActiveGroupChange = (group) => { this.setState({ activeGroup: group }) }
    handleBossChange = (e) => { this.setState({ boss: e.target.value }) }
    handleAddParticpant = (arr) => { this.setState({ raidParticipants: arr }) }
    handleAddOrganizer = (character) => { console.log(character); this.setState({ organizer: character }) }

    render() {
        let title = (this.props.bossName) ? <h1>{this.props.bossName}</h1> : <h1>Custom Boss</h1>
        let display =
            <div className={styles.left}>
                {this.state.activeGroup
                    ? <h3>{this.state.activeGroup.name}'s {this.state.boss} Run</h3>
                    : <h3>{this.state.boss} Run</h3>
                }
                {this.state.organizer
                    ? <h3>Organizer: {this.state.organizer.ign} </h3>
                    : <h3>Organizer: None</h3>
                }
                {this.state.date
                    ? <h3>On: {this.state.date}</h3>
                    : <h3>On: TBD</h3>
                }
                {this.state.raidParticipants.length ?  
                    <>
                        <h3>Participants:</h3>
                        <ul>
                            {this.state.raidParticipants.map((u, idx) => (
                                <ul key={idx}>{u.ign} - Lvl. {u.level} {u.class}</ul>
                            ))}
                        </ul>
                    </>
                    : <h3>Participants: None</h3>
                }
            </div>
        // <div className={styles.left}>
        //     <h2>
        //         {this.state.activeGroup} ? 
        //             {this.state.activeGroup.name}'s {this.state.boss} Run
        //             
        //     </h2>
        //     <h3>
        //         (this.state.date) ?
        //             On: {this.state.date}
        //             : "On: Date TBD"
        //     </h3>
        //     <h4>
        //         (this.state.organizer) ? 
        //             Organized By: {this.state.organizer.ign} </h4>
        //             : "No Organizer"
        //     <h3>Participants:</h3>
        //         (this.state.raidParticipants) ? 
        //             <ul>
        //                 {this.state.raidParticipants.map((u, idx) => (
        //                     <ul key={idx}>{u.ign} - Lvl. {u.level} {u.class}</ul>
        //                 ))}
        //             </ul>
        //             : "None"
        // </div>

        return (
            <>
                {this.props.NavBar}
                {title}
                <div className={styles.CreateRaidPage}>

                    <div className={styles.left}>
                        {display}
                    </div>

                    <div className={styles.right}>
                        <div className={styles.rightPanel}>
                            <RaidParticipationPanel
                                liftParticipantsToState={this.handleAddParticpant}
                                liftOrganizerToState={this.handleAddOrganizer}
                            />
                        </div>
                        <div className={styles.rightPanel}>
                            <RaidGroupsPanel
                                liftActiveGroupToState={this.handleActiveGroupChange}
                            />
                        </div>
                        <div className={styles.rightPanel}>
                            <Calendar
                                liftDateToState={this.handleDateChange}
                            />
                        </div>
                    </div>

                </div>
                <form>
                    <h3>SUBMIT!</h3>
                    <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </>
        )
    }
}

export default CreateRaidPage;