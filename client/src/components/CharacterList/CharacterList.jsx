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
                {this.props.user.characters.map((character, idx) =>
                    <div key={idx} className={styles.myCharactersListSegment}>
                        <CharacterDetail 
                            character={character}
                            deleteCharacter={this.props.deleteCharacter}
                        />
                    </div>
                )}
                {this.state.createFormVisible ?
                    <div className={styles.myCharactersListSegment}>
                        <button type="button" onClick={this.toggleFormVisible}>
                            Hide form
                        </button>
                        <CharacterCreateForm 
                            user={this.props.user}
                            forceFetch={this.props.forceFetch}
                        />

                    </div>
                    :
                    <div className={styles.myCharactersListSegment}>
                        <button type="button" onClick={this.toggleFormVisible}>
                            Add a char
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default CharacterList;