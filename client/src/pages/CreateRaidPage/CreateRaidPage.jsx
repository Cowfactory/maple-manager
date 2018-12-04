import React, { Component } from 'react';
import axios from 'axios';
import options from './options';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidGroups: [],
            boss: null,
        }
    }

    /*--- Lifecycle Methods ---*/
    componentDidMount() {
        if (this.props.defaultBoss) {

        }
        // Get list of raid groups
        axios.get('/api/raidgroups')
            .then(response => {
                if (response.data.type !== 'success') {
                    // failure
                } else {
                    this.setState({
                        raidGroups: response.data.groups
                    })
                }
            })
    }

    /*--- Callback Functions ---*/
    handleSubmit = (e) => {

    }

    handleRaidTypeChange = (e) => {
        this.setState({
            raidType: e.target.value
        })
    }

    render() {
        let bossSelector = (this.props.bossName) ?
            <>
                <div>{this.props.bossName}</div>
            </>
            :
            <>
                <label htmlFor='raid-type'>Boss: </label>
                <select name="raid-type" value={this.state.raidType} onChange={this.handleRaidTypeChange}>
                    {options.bossOptions().map((op, key) => (
                        <option key={key} value={op}>{op}</option>
                        ))}
                </select>
            </>

        return (
            <>
                {this.props.NavBar}
                <h1>Run Creation Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        {bossSelector}

                        {/* <input name='raid-type' type="text" value={this.state.loots}  */}


                    </div>
                    <input type="submit" value='Submit' />
                </form>
            </>
        )
    }
}

export default CreateRaidPage;