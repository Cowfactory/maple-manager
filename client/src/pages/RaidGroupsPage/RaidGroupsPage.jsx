import React, { Component } from 'react';
import styles from './RaidGroupsPage.module.css';
import axios from 'axios';

class RaidGroupsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            error: null,
            groupNameVal: ""
        }
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        this.refreshGroupsList();
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.user) {
            console.log("No user!");
            //
        } else {
            axios.post('/api/raidgroups', {
                name: this.state.groupNameVal,
                creator_id: this.props.user._id
            })
            .then(response => {
                if(response.data.type === 'success') {
                    this.refreshGroupsList();
                    this.setState({ groupNameVal: "" })
                    this.setState({ error: null })
                } else {
                    this.setState({ error: response.data.message });
                }
            })
        }
    }

    handleGroupNameChange = (e) => {
        this.setState({
            groupNameVal: e.target.value
        })
    }
    /*--- Helper functions ---*/
    refreshGroupsList = (e) => {
        axios.get('/api/raidgroups')
            .then(response => {
                this.setState({ groups: response.data.groups })
            })
            .catch(err => {
                this.setState({ error: "No Raid groups available!" });
            })
    }

    render() {
        let errorPanel = (this.state.error) ? <span>{this.state.error}</span> : ''
        return (
            <>
                {this.props.NavBar}
                <div className={styles.RaidGroupsPage}>
                    <div className={styles.left}>
                        <h1>Groups Listing</h1>
                        {this.state.groups.length ?
                            <div>
                                {this.state.groups.map((group, idx) => (
                                    <div key={idx}>
                                        {group.name}
                                    </div>
                                ))}
                            </div>
                            :
                            <div>No Raid groups available!</div>
                        }
                    </div>
                    <div className={styles.right}>
                        <h1>Create a Group!</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="group-name">Group Name: </label>
                                <input name="group-name" type="text" value={this.state.groupNameVal}
                                    onChange={this.handleGroupNameChange}
                                    />
                            </div>
                            <input type="submit" value='Submit' />
                        </form>
                        {errorPanel}
                    </div>
                </div>
            </>
        )
    }
}

export default RaidGroupsPage;