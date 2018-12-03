import React, { Component } from 'react';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidGroups: [],
            type: null,
            organizer: null,
            participants: [],
            loots: []
        }
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        // Get list of raid groups
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {

    }

    render() {
        return (
            <>
                {this.props.NavBar}
                <h1>Run Creation Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='raid-type'>Raid Type</label>
                        <input name='raid-type' type="text" value={this.state.raidTypeVal} 
                        />
                        
                    </div>
                    <input type="submit" value='Submit' />
                </form>
            </>
        )
    }
}

export default CreateRaidPage;