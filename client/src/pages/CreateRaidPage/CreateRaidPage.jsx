import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';
import RaidParticipationPanel from '../../components/RaidParticipationPanel/RaidParticipationPanel';
import RaidGroupsPanel from '../../components/RaidGroupsPanel/RaidGroupsPanel';
import bgImg from '../../img/bg/ht_bg.png';


class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidParticipants: [],
            activeGroup: null,
            loot: [],
            boss: this.props.bossName || 'Zakum',
            date: null,
            organizer: null,
            errArr: [],
            redirectToAccount: false
        }
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {
        let data = {
            participants: this.state.raidParticipants.filter(p => p._id),
            group: this.state.activeGroup,
            loot: this.state.loot,
            boss: this.state.boss,
            date: this.state.date,
            organizer: this.state.organizer
        };

        let errArr = [];
        if (data.participants.length === 0) errArr.push("Missing participants");
        if (!data.boss) errArr.push("Missing Boss");
        if (!data.date) errArr.push("Missing Date");
        if (!data.organizer) errArr.push("Add an organizer!");

        this.setState({ errArr: errArr });
        if (errArr.length === 0) {
            axios.post('/api/bossruns', data)
                .then(response => {
                    console.log(response)
                    this.setState({ redirectToAccount: true })
                })
                .catch(err => { console.log(err) })
        }
    }

    handleDateChange = (date) => { this.setState({ date: date }) }
    handleActiveGroupChange = (group) => { this.setState({ activeGroup: group }) }
    handleBossChange = (e) => { this.setState({ boss: e.target.value }) }
    handleAddParticpant = (arr) => { this.setState({ raidParticipants: arr }) }
    handleAddOrganizer = (character) => { this.setState({ organizer: character }) }

    render() {
        if (this.state.redirectToAccount) return <Redirect to="/account" />

        let title = (this.props.bossName) ? <h2>{this.props.bossName}</h2> : <h2>Custom Boss</h2>
        let display =
            <div className={styles.inner}>
                <div className={styles.horizontalFlex}>
                    <div>
                        {this.state.activeGroup
                            ? <h2>{this.state.activeGroup.name}'s Run</h2>
                            : <h2>Groupless Run</h2>
                        }
                        {this.state.date
                            ? <h5>On: {this.state.date}</h5>
                            : <h5>On: TBD</h5>
                        }
                    </div>
                    <div>
                        {this.state.organizer ?
                            <div className={styles.vertFlex}>
                                <h2>Organizer:</h2>
                                <h5>{this.state.organizer.ign}</h5>
                            </div>
                            :
                            <div className={styles.vertFlex}>
                                <h2>Organizer:</h2>
                                <h5>None</h5>
                            </div>
                        }
                    </div>
                </div>
                <br />
                <h3>Participants:</h3>
                {this.state.raidParticipants.length ?
                    <>
                        <ul className={styles.vertFlex}>
                            {this.state.raidParticipants.map((u, idx) => (
                                <ul key={idx} className={styles.raider}>{u.ign} - Lvl. {u.level} {u.class}</ul>
                            ))}
                        </ul>
                    </>
                    : <h5>None</h5>
                }
            </div>
        let bg = {
            background: `url(${bgImg})`,
            backgroundSize: 'cover'
        }
        return (
            <div className={styles.bg} style={bg}>
                {this.props.NavBar}
                {/* {title} */}
                <div className={styles.CreateRaidPage}>

                    <div className={styles.left}>
                        {title}
                        <hr />
                        {display}
                        <form className={styles.form}>
                            <h3>SUBMIT!</h3>
                            <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
                            <div>
                                {this.state.errArr.map((msg, idx) => <p key={idx}>{msg}</p>)}
                            </div>
                        </form>
                    </div>

                    <div className={styles.right}>
                        <h2>Run Controls</h2>
                        <hr />
                        <div className={styles.inner}>
                            <div className={styles.vertFlex}>
                                <RaidParticipationPanel
                                    liftParticipantsToState={this.handleAddParticpant}
                                    liftOrganizerToState={this.handleAddOrganizer}
                                />
                            </div>
                            <div>
                                <RaidGroupsPanel
                                    liftActiveGroupToState={this.handleActiveGroupChange}
                                />
                            </div>
                            <div className={styles.vertFlex}>
                                <Calendar
                                    liftDateToState={this.handleDateChange}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateRaidPage;