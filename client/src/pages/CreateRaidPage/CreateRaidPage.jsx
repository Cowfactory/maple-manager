import React, { Component } from 'react';
import axios from 'axios';
import options from './options';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CreateRaidPage.module.css';
import RaidParticipationPanel from '../../components/RaidParticipationPanel/RaidParticipationPanel';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidParticipants: [],
            // allUsers: [],
            allRaidGroups: [],
            allCharacters: [],
            boss: '',
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

                let defaultBoss = 'Zakum';

                this.setState({
                    allRaidGroups: raidGroups,
                    allCharacters: allCharacters,
                    // currentlySelectedCharacter: allCharacters[0],
                    boss: this.props.bossName || defaultBoss
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
        // let lootSelector = 
        //     <>
        //         <label htmlFor="loot"></label>
        //         <select>

        //         </select>
        //     </>;
        
        // done this way b/c for some reason the renders aren't happening on state change...
        let raidParticipationPanel = (this.state.allCharacters.length) ?
            <RaidParticipationPanel 
                allCharacters={this.state.allCharacters}
            />
            :
            <div></div>

        return (
            <>
                {this.props.NavBar}
                {title}

                <div className={styles.CreateRaidPage}>

                    {raidParticipationPanel}
                    


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