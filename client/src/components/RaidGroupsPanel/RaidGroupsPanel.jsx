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
                console.log("Error in API request at /api/raidGroups")
                //ToDo: Toast an error
            })
    }

    handleSelectChange = (e) => {
        this.setState({
            _selectVal: e.target.value
        })
    }

    handleGroupSelect = (e) => {
        // On the initial click - _selectVal won't be set yet (null)
        if (!this.state._selectVal) {
            // if no selection
            let val = this.state.allRaidGroups[0];
            let str = JSON.stringify(val);
            this.setState({
                _selectVal: str,
                selectedGroup: val
            })
            this.props.liftActiveGroupToState(val);
        } else {
            // there is a user-selected _value
            let val = JSON.parse(this.state._selectVal);
            this.setState({
                selectedGroup: val
            })
            this.props.liftActiveGroupToState(val)
        }
    }

    createNewGroup = (e) => {
        //ToDo
    }

    render() {
        let groupSelector =
            <div className={styles.groupSelector}>
                <h3><label htmlFor="groups">Group: </label></h3>
                <div>
                    <select name="groups"
                        onChange={this.handleSelectChange}
                        value={this.state._selectVal}>

                        {this.state.allRaidGroups.map((group, idx) => (
                            <option key={idx} value={JSON.stringify(group)}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                    <button type="button" value='New Team' onClick={this.createNewGroup}>Select Group</button>
                </div>
                {/* <button className={styles.submitBtn} type="button" value='Select Team' 
                    onClick={this.handleGroupSelect}>
                    Select Team
                </button> */}
            </div>

        // let groupDisplay =
        //     <div className={styles.groupDisplay}>
        //         {(this.state._selectVal) ? this.state.selectedGroup.name : ""}
        //     </div>

        return (
            <div className={styles.RaidGroupsPanel}>
                {groupSelector}
                {/* {groupDisplay} */}
            </div>
        )
    }

}

export default RaidGroupsPanel;