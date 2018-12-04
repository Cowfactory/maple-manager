import React, { Component } from 'react';
import options from './options';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';
import RaidParticipationPanel from '../../components/RaidParticipationPanel/RaidParticipationPanel';
import RaidGroupsPanel from '../../components/RaidGroupsPanel/RaidGroupsPanel';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidParticipants: [],
            // allRaidGroups: [],
            // allCharacters: [],
            boss: this.props.bossName || null,
            activeGroup: null,
            date: null
        }
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {

    }
    
    handleDateChange = (date) => { this.setState({ date: date }) }
    handleActiveGroupChange = (group) => { this.setState({ activeGroup: group }) }
    handleBossChange = (e) => { this.setState({ boss: e.target.value }) }
    handleAddParticpant = (arr) => { this.setState({raidParticipants: arr}) }
  
    render() {
        let title = (this.props.bossName) ? <h1>{this.props.bossName}</h1> : <h1>Custom Boss</h1>
        let bossSelector = (!this.props.bossName) ?
            <>
                <label htmlFor='raid-type'>Boss: </label>
                <select name="raid-type" value={this.state.boss} onChange={this.handleBossChange}>
                    {options.bossOptions().map((op, key) => (
                        <option key={key} value={op}>{op}</option>
                    ))}
                </select>
            </> : <h3>{this.state.boss}</h3>;

        return (
            <>
                {this.props.NavBar}
                {title}
                <div className={styles.CreateRaidPage}>
                    <RaidParticipationPanel 
                        liftParticipantsToState={this.handleAddParticpant}
                    />
                    <RaidGroupsPanel 
                        liftActiveGroupToState={this.handleActiveGroupChange}
                    />
                    <Calendar 
                        liftDateToState={this.handleDateChange}
                    />
                </div>
            </>
        )
    }
}

export default CreateRaidPage;