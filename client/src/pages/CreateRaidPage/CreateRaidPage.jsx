import React, { Component } from 'react';
import axios from 'axios';
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
            // allUsers: [],
            allRaidGroups: [],
            allCharacters: [],
            boss: '',
            date: this.props.bossName || null,
        }
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {

    }
    
    handleDateChange = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    handleBossChange = (e) => {
        this.setState({
            boss: e.target.value
        })
    }
  
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

                    {/* {raidParticipationPanel} */}
                    <RaidParticipationPanel />
                    <RaidGroupsPanel />


                    {/* <div className={styles.left}>
                        <div>
                            {bossSelector}
                            
                            <form onSubmit={this.handleSubmit}>
                                <input type="submit" value='Submit' />
                            </form>
                        </div>
                    </div>



                    <div className={styles.right}>
                        <span>Date:</span>
                        <div className={styles.calendar}>
                            <Calendar handleChange={this.handleDateChange} /><br /><br />
                        </div>
                        <span>Participants:</span>
                        
                    </div> */}


                </div>
            </>
        )
    }
}

export default CreateRaidPage;