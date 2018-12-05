import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickRaidList.module.css';
import zakumImg from '../../img/bosses/zakum.png';
import horntailImg from '../../img/bosses/ht.webp';
import customImg from '../../img/bosses/mano.png';

const QuickRaidList = (props) => (
    <div className={styles.QuickRaidList}>
        <div className={styles.listSegment}>
            <div className={styles.subSegment}>
                <img className={styles.bossImg} src={horntailImg} alt="Horntail"></img>
            </div>
            <div className={styles.textSegment}>
                <b>Horntail</b>
                <p>Lvl. 155</p>
            </div>
            <Link className={styles.subSegment} to={{ pathname: '/createRaid', state: {bossName: 'Horntail'} }} >
                New Horntail Run
            </Link>
        </div>
        <div className={styles.listSegment}>
            <div className={styles.subSegment}>
                <img className={styles.bossImg} src={zakumImg} alt="Zakum"></img>
            </div>
            <div className={styles.textSegment}>
                <b>Zakum</b>
                <p>Lvl. 135</p>
            </div>
            <Link className={styles.subSegment} to={{ pathname: '/createRaid', state: {bossName: 'Zakum'} }} > 
                New Zakum Run
            </Link>
        </div>
        <div className={styles.listSegment}>
            <div className={styles.subSegment}>
                <img className={styles.bossImg} src={customImg} alt="custom boss"></img>
            </div>
            <div className={styles.textSegment}>
                <b>Custom</b>
                <p>Lvl. ? </p>
            </div>
            <Link className={styles.subSegment} to="/createRaid">New Run</Link>
        </div>
    </div>
)

export default QuickRaidList;