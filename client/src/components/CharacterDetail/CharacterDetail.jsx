import React from 'react';
import styles from './CharacterDetail.module.css';

const CharacterDetail = ({character}) => (
    <div className={styles.CharacterDetail}>
        <div className={styles.leftDetail}>
            <p className={styles.ign}>{character.ign}</p>
        </div>
        <div className={styles.rightDetail}>
            <p className={styles.ign}>{character.class}</p>
            <p className={styles.level}>{character.level}</p>
        </div>
    </div>
)

export default CharacterDetail;