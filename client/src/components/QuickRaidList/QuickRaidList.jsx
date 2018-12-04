import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickRaidList.module.css';
import zakumImg from '../../img/jobicons/all.png';
import horntailImg from '../../img/jobicons/all.png';
import customImg from '../../img/jobicons/all.png';

const QuickRaidList = (props) => (
    <div className={styles.QuickRaidList}>
        <div className={styles.listSegment}>
            <img src={horntailImg} alt="Horntail"></img>
            <p>Horntail</p>
            <Link to={{ pathname: '/createRaid', state: {bossName: 'Horntail'} }} >
                New Horntail Run
            </Link>
        </div>
        <div className={styles.listSegment}>
            <img src={zakumImg} alt="Zakum"></img>
            <p>Zakum</p>
            <Link to={{ pathname: '/createRaid', state: {bossName: 'Zakum'} }} > 
                New Zakum Run
            </Link>
        </div>
        <div className={styles.listSegment}>
            <img src={customImg} alt="custom boss"></img>
            <p>Custom Run</p>
            <Link to="/createRaid">New Run</Link>
        </div>
    </div>
)

export default QuickRaidList;