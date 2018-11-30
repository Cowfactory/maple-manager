import React, { Component } from 'react';
import errorPanel from '../ErrorPanel/ErrorPanel';

class CharacterCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joe: "bob"
        }
    }
    handleSomeChange = () => {

    }
    handleSubmit = () => {

    }

    render() {
        return (
            <div>
                <h3>Add Character:</h3>
                {errorPanel}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="l-ign">IGN:</label>
                        </div>
                        <div>
                            <input name="l-ign" type='text' value={this.state.joe} onChange={this.handleSomeChange} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="l-class">Class:</label>
                        </div>
                        <div>
                            <input name="l-class" type='text' value={this.state.joe} onChange={this.handleSomeChange} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="l-level">Level:</label>
                        </div>
                        <div>
                            <input name="l-level" type='text' value={this.state.joe} onChange={this.handleSomeChange} />
                        </div>
                    </div>
                    <input type="submit" value='Create!' />
                </form>
            </div>
        )
    }
};

export default CharacterCreateForm;
