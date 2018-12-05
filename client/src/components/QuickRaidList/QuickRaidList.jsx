import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickRaidList.module.css';
import zakumImg from '../../img/bosses/zakum.png';
import horntailImg from '../../img/bosses/ht.webp';
import customImg from '../../img/bosses/mano.png';
import signImg from '../../img/misc/sign.png';

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
            <div className={styles.subSegment}>
                <Link className={styles.textSegment} to={{ pathname: '/createRaid', state: {bossName: 'Horntail'} }} >
                    <b>New Run</b>
                    <img src={signImg} className={styles.signImg}></img>
                </Link>
            </div>
        </div>
        <div className={styles.listSegment}>
            <div className={styles.subSegment}>
                <img className={styles.bossImg} src={zakumImg} alt="Zakum"></img>
            </div>
            <div className={styles.textSegment}>
                <b>Zakum</b>
                <p>Lvl. 135</p>
            </div>
            <div className={styles.subSegment}>
                <Link className={styles.textSegment} to={{ pathname: '/createRaid', state: {bossName: 'Zakum'} }} > 
                    <b>New Run</b>
                    <img src={signImg} className={styles.signImg}></img>
                </Link>
            </div>
        </div>
        <div className={styles.listSegment}>
            <div className={styles.subSegment}>
                <img className={styles.bossImg} src={customImg} alt="custom boss"></img>
            </div>
            <div className={styles.textSegment}>
                <b>Custom</b>
                <p>Lvl. ? </p>
            </div>
            <div className={styles.subSegment}>
                <Link className={styles.textSegment} to="/createRaid">
                    <b>New Run</b>
                    <img src={signImg} className={styles.signImg}></img>
                </Link>
            </div>
        </div>
    </div>
)

export default QuickRaidList;