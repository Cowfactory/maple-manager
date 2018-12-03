import React, { Component } from 'react';
import CharacterDetail from '../CharacterDetail/CharacterDetail';
import CharacterCreateForm from '../CharacterCreateForm/CharacterCreateForm';
import styles from './CharacterList.module.css';

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createFormVisible: false
        }
    }

    toggleFormVisible = (e) => {
        this.setState((currentState) => {
            return {
                createFormVisible: !currentState.createFormVisible
            }
        })
    }

    render() {
        return (
            <div className={styles.CharacterList}>
                <ul>
                    {this.props.user.characters.map((character, idx) =>
                        <li key={idx} className={styles.myCharactersListSegment}>
                            <CharacterDetail 
                                character={character}
                                deleteCharacter={this.props.deleteCharacter}
                            />
                        </li>
                    )}
                    {this.state.createFormVisible ?
                        <li className={styles.myCharactersListSegment}>
                            <button type="button" onClick={this.toggleFormVisible}>
                                Hide form
                            </button>
                            <CharacterCreateForm />

                        </li>
                        :
                        <li className={styles.myCharactersListSegment}>
                            <button type="button" onClick={this.toggleFormVisible}>
                                Add a char
                            </button>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

export default CharacterList;