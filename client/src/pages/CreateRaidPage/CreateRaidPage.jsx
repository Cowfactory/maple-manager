import React, { Component } from 'react';

class CreateRaidPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bob: "bob"
        }
    }

    render() {
        return (
            <>
                {this.props.NavBar}
                <h1>Run Creation Form</h1>
            </>
        )
    }
}

export default CreateRaidPage;