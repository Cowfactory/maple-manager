import React, { Component } from 'react';
import styles from './RaidGroupsPanel.module.css';
import axios from 'axios';

class RaidGroupsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRaidGroups: [],
            _selectVal: '',
            selectedGroup: null,
        }
    }

    componentDidMount() {
        axios.get('/api/raidgroups')
            .then(response => {
                let raidGroups = response.data.groups;
                this.setState({
                    allRaidGroups: raidGroups,
                    selectedGroup: raidGroups[0]
                })
            })
            .catch(err => {
                console.log(err)
                //ToDo: Toast an error
            })
    }

    handleSelectChange = (e) => {
        this.setState({
            _selectVal: e.target.value
        })
    }

    handleGroupSelect = (e) => {
        if(!this.state._selectVal) {
            let val = this.state.allRaidGroups[0];
            let str = JSON.stringify(this.state.allRaidGroups[0]);
            this.setState({
                _selectVal: str,
                selectedGroup: val 
            })
        } else {
            this.setState({
                selectedGroup: JSON.parse(this.state._selectVal)
            })
        }
    }

    createNewGroup = (e) => {
        //ToDo
    }

    render() {
        let groupSelector =
            <div className={styles.groupSelector}>
                <label htmlFor="groups">Group: </label>
                <select name="groups"
                    onChange={this.handleSelectChange}
                    value={this.state._selectVal}>

                    {this.state.allRaidGroups.map((group, idx) => (
                        <option key={idx} value={JSON.stringify(group)}>
                            {group.name}
                        </option>
                    ))}
                </select>
                <button type="button" value='Select Team' onClick={this.handleGroupSelect}>Select Team</button>
                <button type="button" value='New Team' onClick={this.createNewGroup}>New Team</button>
            </div>

        let groupDisplay = 
            <div className={styles.groupDisplay}>
                {(this.state._selectVal) ? this.state.selectedGroup.name : ""}
            </div>

        return (
            <div className={styles.RaidGroupsPanel}>
                {groupSelector}
                {groupDisplay}
            </div>
        )
    }

}

export default RaidGroupsPanel;