import React, { Component } from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';
import axios from 'axios';
import styles from './AccountPage.module.css';

class AccountPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: []
        }
    }

    /*--- Lifecycle Methods ---*/
    // Load the character list via API call on-load
    componentDidMount() {
        let charIds = this.props.user.characters.map(c => c._id)

        Promise.all([
            axios.get(`/api/users/${this.props.user._id}/characters`),
            axios.request(`/api/bossruns`, {
                method: 'get',
                params: { charIds: charIds }
            }) 
        ])
        .then(responses => {
            let characters = responses[0].data;
            let bossruns = responses[1].data;
            console.log(characters)
            console.log(bossruns);

            this.setState({ characters })
        })
        .catch(err => { console.log(err) })
    }



    /*--- Callback functions ---*/
    deleteCharacter = (e) => {
        // check where character state should be
        console.log("test delte character");
    }

    render() {
        return (
            <>
                {this.props.NavBar}
                <div className={styles.AccountPage}>
                    <div className={styles.left}>
                        <h1>My Runs</h1>
                    </div>
                    <div className={styles.right}>
                        <h1>My Characters</h1>
                        <CharacterList
                            user={this.props.user}
                            deleteCharacter={this.deleteCharacter}
                        />
                    </div>
                </div>
            </>
        );
    }
};

export default AccountPage;