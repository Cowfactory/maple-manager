import React, { Component } from 'react';

class RaidGroupCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupNameVal: ""
        }
    }

    /*--- Callback Functions ---*/
    handleGroupNameChange = (e) => {
        this.setState({
            groupNameValue: e.target.value
        })
    }

    handleSubmit = (e) => { 

    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="group-name">Group Name: </label>
                <input name="group-name" type="text" value={this.state.groupNameVal}
                    onChange={this.handleGroupNameChange}
                />
            </div>
            <input type="submit" value='Submit' />
        </form>
        )
    }
}

export default RaidGroupCreateForm;