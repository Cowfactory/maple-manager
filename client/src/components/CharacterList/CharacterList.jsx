import React from 'react';
import CharacterDetail from '../CharacterDetail/CharacterDetail';

const CharacterList = (props) => (
    <div>
        {props.user.characters.map(character => 
            <CharacterDetail character={character} /> 
        )}
    </div>
)

export default CharacterList;